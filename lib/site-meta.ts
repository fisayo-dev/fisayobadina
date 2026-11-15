import "server-only";
import { cache } from "react";

/** What a project's live website publishes about itself. */
export type SiteMeta = {
  title?: string;
  description?: string;
  ogImage?: string;
  favicon?: string;
};

const REVALIDATE = 60 * 60 * 24; // refresh once a day
const TIMEOUT = 8000;
const UA = "Mozilla/5.0 (compatible; PortfolioPreview/1.0)";

const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

function attr(tag: string, name: string) {
  const m = tag.match(new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i"));
  return m ? decode(m[2] ?? m[3] ?? "") : undefined;
}

function metaContent(tags: string[], key: string) {
  const tag = tags.find((t) => {
    const k = attr(t, "property") ?? attr(t, "name");
    return k?.toLowerCase() === key;
  });
  return tag ? attr(tag, "content") : undefined;
}

/** Rank icon links: SVG first, then the largest raster icon. */
function rankIcon(tag: string) {
  const rel = attr(tag, "rel")?.toLowerCase() ?? "";
  const href = attr(tag, "href") ?? "";
  const type = attr(tag, "type") ?? "";
  if (type.includes("svg") || /\.svg(\?|$)/.test(href) || href.startsWith("data:image/svg")) return 1000;
  const size = Number(attr(tag, "sizes")?.split("x")[0]) || (rel.includes("apple") ? 180 : 32);
  return size;
}

async function get(url: string) {
  return fetch(url, {
    headers: { "user-agent": UA, accept: "text/html,image/*;q=0.9,*/*;q=0.8" },
    signal: AbortSignal.timeout(TIMEOUT),
    next: { revalidate: REVALIDATE },
  });
}

async function isImage(url: string) {
  if (url.startsWith("data:image/")) return true;
  try {
    const res = await get(url);
    const type = res.headers.get("content-type") ?? "";
    return res.ok && (type.startsWith("image/") || type.includes("icon") || type.includes("octet-stream"));
  } catch {
    return false;
  }
}

export const getSiteMeta = cache(async (pageUrl: string): Promise<SiteMeta> => {
  // GitHub repos would all show GitHub's own icon and copy; skip them.
  if (new URL(pageUrl).host === "github.com") return {};

  let html = "";
  let base = pageUrl;
  try {
    const res = await get(pageUrl);
    if (res.ok) {
      html = (await res.text()).slice(0, 200_000);
      base = res.url || pageUrl;
    }
  } catch {
    // Site unreachable: fall through to the favicon.ico probe and local fallbacks.
  }

  const head = html.split(/<\/head>/i)[0];
  const metas = head.match(/<meta\b[^>]*>/gi) ?? [];
  const links = head.match(/<link\b[^>]*>/gi) ?? [];
  const abs = (href?: string) => {
    if (!href) return undefined;
    try {
      return href.startsWith("data:") ? href : new URL(href, base).toString();
    } catch {
      return undefined;
    }
  };

  const titleTag = head.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1];
  const meta: SiteMeta = {
    title: (titleTag && decode(titleTag)) || metaContent(metas, "og:title"),
    description: metaContent(metas, "description") ?? metaContent(metas, "og:description"),
    ogImage: abs(metaContent(metas, "og:image") ?? metaContent(metas, "twitter:image")),
  };

  const candidates = links
    // rel must contain the token "icon" or "apple-touch-icon". "mask-icon" is a
    // single-colour Safari glyph and would render as a solid blob.
    .filter((l) => {
      const rel = (attr(l, "rel") ?? "").toLowerCase().split(/\s+/);
      return rel.includes("icon") || rel.includes("apple-touch-icon");
    })
    .sort((a, b) => rankIcon(b) - rankIcon(a))
    .map((l) => abs(attr(l, "href")))
    .filter((u): u is string => Boolean(u));
  candidates.push(new URL("/favicon.ico", base).toString());

  for (const url of candidates) {
    if (await isImage(url)) {
      meta.favicon = url;
      break;
    }
  }

  return meta;
});
