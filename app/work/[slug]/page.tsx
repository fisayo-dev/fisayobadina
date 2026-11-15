import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft01Icon, ArrowRight01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Favicon } from "@/components/favicon";
import { Icon } from "@/components/icon";
import { JsonLd } from "@/components/json-ld";
import { getProject, hostOf, projects } from "@/lib/projects";
import { getSiteMeta } from "@/lib/site-meta";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const revalidate = 86400;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  const kind = project.kind === "product" ? "Product" : "Project";
  const description = `${project.summary}${project.event ? ` Built for the ${project.event}.` : ""} By ${site.name}.`;
  const path = `/work/${project.slug}`;

  return {
    title: `${project.name} · ${kind}`,
    description,
    alternates: { canonical: path },
    openGraph: { type: "article", url: path, title: `${project.name} by ${site.name}`, description, siteName: site.name },
    twitter: { card: "summary_large_image", title: `${project.name} by ${site.name}`, description },
  };
}

export default async function WorkPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const meta = await getSiteMeta(project.url);
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const host = hostOf(project.url);
  const kind = project.kind === "product" ? "Product" : project.event ? "Hackathon project" : "Project";

  const facts = [
    ["Type", kind],
    ["Built for", project.event],
    ["Stack", project.stack?.join(", ")],
    ["Website", host],
  ].filter((f): f is [string, string] => Boolean(f[1]));

  return (
    <article className="mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": project.url.includes("github.com") ? "SoftwareSourceCode" : "WebApplication",
              name: project.name,
              url: project.url,
              description: project.summary,
              ...(project.url.includes("github.com") ? {} : { applicationCategory: "BusinessApplication", operatingSystem: "Web" }),
              ...(meta.ogImage ? { image: meta.ogImage } : {}),
              author: { "@type": "Person", "@id": `${site.url}/#person`, name: site.name, url: site.url },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: site.name, item: site.url },
                { "@type": "ListItem", position: 2, name: project.kind === "product" ? "Products" : "Projects", item: `${site.url}/#${project.kind}s` },
                { "@type": "ListItem", position: 3, name: project.name, item: `${site.url}/work/${project.slug}` },
              ],
            },
          ],
        }}
      />

      <nav aria-label="Breadcrumb">
        <Link
          href={`/#${project.kind}s`}
          className="inline-flex items-center gap-1.5 text-sm text-t3 transition-colors hover:text-foreground"
        >
          <Icon icon={ArrowLeft01Icon} size={15} />
          All {project.kind}s
        </Link>
      </nav>

      <header className="mt-8 flex flex-col gap-6 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Favicon src={meta.favicon} logo={project.logo} icon={project.icon} size="lg" />
          <p className="mt-6 text-sm text-t3">{kind}</p>
          <h1 className="mt-1 text-[38px] font-[350] leading-[1.05] tracking-[-0.045em] sm:text-[56px]">{project.name}</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-t3 sm:text-[17px]">{project.summary}</p>
        </div>
        <Button asChild size="lg" className="w-full sm:w-auto">
          <a href={project.url} target="_blank" rel="noreferrer">
            Visit {host}
            <Icon icon={ArrowUpRight01Icon} />
          </a>
        </Button>
      </header>

      {/* 1px gaps over a line-coloured background draw the inner rules. */}
      <dl className="mt-10 flex flex-wrap gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line">
        {facts.map(([label, value]) => (
          <div key={label} className="min-w-0 flex-1 basis-[calc(50%-1px)] bg-panel px-4 py-4 md:basis-0">
            <dt className="text-[13px] text-t4">{label}</dt>
            <dd className="mt-1 break-words text-sm font-medium">{value}</dd>
          </div>
        ))}
      </dl>

      {(meta.title || meta.description || meta.ogImage) && (
        <section aria-labelledby="seo-title" className="mt-14">
          <h2 id="seo-title" className="text-xl font-[450] tracking-[-0.03em]">How it shows up online</h2>
          <p className="mt-1 text-sm text-t3">Pulled from the live site’s public metadata.</p>

          <div className={`mt-5 grid gap-3 ${meta.ogImage ? "lg:grid-cols-2" : ""}`}>
            {/* Search result preview */}
            <div className="rounded-[var(--radius-card)] border border-line bg-panel p-5">
              <p className="text-[13px] text-t4">Search result</p>
              <div className="mt-4 flex items-center gap-2.5">
                <Favicon src={meta.favicon} logo={project.logo} icon={project.icon} size="sm" className="size-7 rounded-full" />
                <div className="min-w-0 leading-tight">
                  <p className="truncate text-sm">{project.name}</p>
                  <p className="truncate text-xs text-t3">{project.url.replace(/\/$/, "")}</p>
                </div>
              </div>
              {meta.title && <p className="mt-2.5 text-lg leading-snug text-brand">{meta.title}</p>}
              {meta.description && <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-t3">{meta.description}</p>}
            </div>

            {/* Social card preview */}
            {meta.ogImage && (
              <div className="rounded-[var(--radius-card)] border border-line bg-panel p-5">
                <p className="text-[13px] text-t4">Social card</p>
                <div className="mt-4 overflow-hidden rounded-xl border border-line">
                  {/* eslint-disable-next-line @next/next/no-img-element -- remote OG images from arbitrary hosts */}
                  <img
                    src={meta.ogImage}
                    alt={`Social preview image for ${project.name}`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="aspect-[1.91/1] w-full bg-panel-raised object-cover"
                  />
                  <div className="border-t border-line px-3.5 py-3">
                    <p className="text-xs text-t4">{host}</p>
                    <p className="mt-0.5 truncate text-sm font-medium">{meta.title ?? project.name}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <Link
        href={`/work/${next.slug}`}
        className="group mt-14 flex items-center gap-4 rounded-[var(--radius-card)] border border-line bg-panel p-4 transition-colors hover:border-line-strong sm:p-5"
      >
        <span className="min-w-0 flex-1">
          <span className="block text-[13px] text-t4">Next</span>
          <span className="block truncate text-lg font-medium tracking-[-0.02em]">{next.name}</span>
        </span>
        <span className="text-t4 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground">
          <Icon icon={ArrowRight01Icon} size={20} />
        </span>
      </Link>
    </article>
  );
}
