import "server-only";
import { cache } from "react";

export type Repo = {
  fullName: string;
  url: string;
  description?: string;
  stars: number;
  forks: number;
  pushedAt: string;
  topics: string[];
  /** Share of code per language, largest first, as whole percentages. */
  languages: { name: string; percent: number }[];
};

const headers: HeadersInit = {
  accept: "application/vnd.github+json",
  "user-agent": "portfolio-site",
  ...(process.env.GITHUB_TOKEN ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

async function gh<T>(path: string): Promise<T | undefined> {
  try {
    const res = await fetch(`https://api.github.com${path}`, {
      headers,
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 60 * 60 * 24 },
    });
    return res.ok ? ((await res.json()) as T) : undefined;
  } catch {
    return undefined;
  }
}

/** Reads a public repo ("owner/name"). Returns undefined if GitHub is unreachable or rate-limited. */
export const getRepo = cache(async (repo: string): Promise<Repo | undefined> => {
  type RepoJson = {
    full_name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    pushed_at: string;
    topics?: string[];
  };
  const [data, langs] = await Promise.all([
    gh<RepoJson>(`/repos/${repo}`),
    gh<Record<string, number>>(`/repos/${repo}/languages`),
  ]);
  if (!data) return undefined;

  const total = Object.values(langs ?? {}).reduce((a, b) => a + b, 0) || 1;
  const languages = Object.entries(langs ?? {})
    .map(([name, bytes]) => ({ name, percent: Math.round((bytes / total) * 100) }))
    .filter((l) => l.percent > 0)
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 5);

  return {
    fullName: data.full_name,
    url: data.html_url,
    description: data.description ?? undefined,
    stars: data.stargazers_count,
    forks: data.forks_count,
    pushedAt: data.pushed_at,
    topics: data.topics ?? [],
    languages,
  };
});
