import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { IconSvgElement } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  Award01Icon,
  Clock01Icon,
  Folder01Icon,
  GitForkIcon,
  Globe02Icon,
  StarIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { BrandIcon } from "@/components/brand-icon";
import { Favicon } from "@/components/favicon";
import { Icon } from "@/components/icon";
import { JsonLd } from "@/components/json-ld";
import { StackGrid } from "@/components/stack";
import { github } from "@/lib/brands";
import { getRepo } from "@/lib/github";
import { getProject, hostOf, isRepoOnly, projects } from "@/lib/projects";
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

const dateFmt = new Intl.DateTimeFormat("en", { month: "short", year: "numeric" });

export default async function WorkPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const [meta, repo, nextMeta] = await Promise.all([
    getSiteMeta(project.url),
    project.repo ? getRepo(project.repo) : Promise.resolve(undefined),
    getSiteMeta(next.url),
  ]);
  const repoOnly = isRepoOnly(project);
  const host = hostOf(project.url);
  const repoUrl = repo?.url ?? (project.repo ? `https://github.com/${project.repo}` : undefined);
  const kind = project.kind === "product" ? "Product" : project.event ? "Hackathon project" : "Project";

  const details: { icon: IconSvgElement | "github"; label: string; value: string; href?: string }[] = [
    { icon: Folder01Icon, label: "Type", value: kind },
    ...(project.event ? [{ icon: Award01Icon, label: "Built for", value: project.event }] : []),
    ...(project.role ? [{ icon: UserIcon, label: "My role", value: project.role }] : []),
    ...(!repoOnly ? [{ icon: Globe02Icon, label: "Website", value: host, href: project.url }] : []),
    ...(project.repo && repoUrl ? [{ icon: "github" as const, label: "Repository", value: project.repo, href: repoUrl }] : []),
    ...(repo ? [{ icon: Clock01Icon, label: "Last updated", value: dateFmt.format(new Date(repo.pushedAt)) }] : []),
  ];

  return (
    <article className="mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": repoOnly ? "SoftwareSourceCode" : "WebApplication",
              name: project.name,
              url: project.url,
              description: project.description,
              ...(repoUrl ? { codeRepository: repoUrl } : {}),
              ...(repo?.languages.length ? { programmingLanguage: repo.languages.map((l) => l.name) } : {}),
              ...(repoOnly ? {} : { applicationCategory: "BusinessApplication", operatingSystem: "Web" }),
              ...(meta.ogImage ? { image: meta.ogImage } : {}),
              author: { "@type": "Person", "@id": `${site.url}/#person`, name: site.name, url: site.url },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: site.name, item: site.url },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: project.kind === "product" ? "Products" : "Projects",
                  item: `${site.url}/#${project.kind}s`,
                },
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

      {/* Header */}
      <header className="mt-8 sm:mt-10">
        <div className="flex items-center gap-4">
          <Favicon src={meta.favicon} logo={project.logo} icon={project.icon} size="lg" />
          <div className="min-w-0">
            <p className="text-sm text-t3">{kind}</p>
            <p className="truncate font-mono text-xs text-t4">{repoOnly ? project.repo : host}</p>
          </div>
        </div>
        <h1 className="mt-6 text-[40px] font-[350] leading-[1.05] tracking-[-0.045em] sm:text-[56px]">{project.name}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-t3 sm:text-lg">{project.summary}</p>
        <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
          {!repoOnly && (
            <Button asChild size="lg">
              <a href={project.url} target="_blank" rel="noreferrer">
                Visit {host}
                <Icon icon={ArrowUpRight01Icon} />
              </a>
            </Button>
          )}
          {repoUrl && (
            <Button asChild size="lg" variant={repoOnly ? "default" : "outline"}>
              <a href={repoUrl} target="_blank" rel="noreferrer">
                <BrandIcon brand={github} size={16} />
                View on GitHub
              </a>
            </Button>
          )}
        </div>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12">
        {/* Main column */}
        <div className="min-w-0 space-y-12">
          <section aria-labelledby="about">
            <h2 id="about" className="text-xl font-[450] tracking-[-0.03em]">About</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-t2 sm:text-base">{project.description}</p>
            {project.highlights && (
              <ul className="mt-5 space-y-2.5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-t3">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-brand" />
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {project.stack.length > 0 && (
            <section aria-labelledby="stack">
              <h2 id="stack" className="text-xl font-[450] tracking-[-0.03em]">Tech stack</h2>
              <div className="mt-4">
                <StackGrid stack={project.stack} />
              </div>
            </section>
          )}

          {project.repo && repoUrl && (
            <section aria-labelledby="source">
              <h2 id="source" className="text-xl font-[450] tracking-[-0.03em]">Source code</h2>
              <a
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                className="group mt-4 block rounded-[var(--radius-card)] border border-line bg-panel p-5 transition-colors hover:border-line-strong"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-background text-foreground">
                    <BrandIcon brand={github} size={18} />
                  </span>
                  <span className="min-w-0 flex-1 truncate font-mono text-sm">{repo?.fullName ?? project.repo}</span>
                  <span className="text-t4 transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground">
                    <Icon icon={ArrowUpRight01Icon} size={16} />
                  </span>
                </div>
                {repo?.description && <p className="mt-3 text-sm leading-relaxed text-t3">{repo.description}</p>}

                {repo && repo.languages.length > 0 && (
                  <div className="mt-5">
                    <div className="flex h-1.5 gap-0.5 overflow-hidden rounded-full">
                      {repo.languages.map((l) => (
                        <span key={l.name} className="h-full bg-foreground" style={{ width: `${l.percent}%`, opacity: langOpacity(l.name, repo.languages) }} />
                      ))}
                    </div>
                    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-t3">
                      {repo.languages.map((l) => (
                        <li key={l.name} className="flex items-center gap-1.5">
                          <span
                            aria-hidden="true"
                            className="size-2 rounded-full bg-foreground"
                            style={{ opacity: langOpacity(l.name, repo.languages) }}
                          />
                          {l.name} <span className="tabular-nums text-t4">{l.percent}%</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {repo && (
                  <div className="mt-4 flex gap-4 border-t border-line pt-4 text-[13px] text-t3">
                    <span className="flex items-center gap-1.5">
                      <Icon icon={StarIcon} size={14} />
                      {plural(repo.stars, "star")}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Icon icon={GitForkIcon} size={14} />
                      {plural(repo.forks, "fork")}
                    </span>
                  </div>
                )}
              </a>
            </section>
          )}

          {!repoOnly && (meta.title || meta.description) && (
            <section aria-labelledby="online">
              <h2 id="online" className="text-xl font-[450] tracking-[-0.03em]">How it shows up online</h2>
              <div className={`mt-4 grid gap-3 ${meta.ogImage ? "md:grid-cols-2" : ""}`}>
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
        </div>

        {/* Details sidebar */}
        <aside aria-labelledby="details" className="lg:sticky lg:top-20 lg:self-start">
          <h2 id="details" className="sr-only">Details</h2>
          <dl className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-panel">
            {details.map((d) => (
              <div key={d.label} className="flex items-center gap-3 border-t border-line px-4 py-3.5 first:border-t-0">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-line bg-background text-t2">
                  {d.icon === "github" ? <BrandIcon brand={github} size={15} /> : <Icon icon={d.icon} size={15} />}
                </span>
                <div className="min-w-0">
                  <dt className="text-xs text-t4">{d.label}</dt>
                  <dd className="truncate text-sm font-medium">
                    {d.href ? (
                      <a href={d.href} target="_blank" rel="noreferrer" className="hover:text-brand">
                        {d.value}
                      </a>
                    ) : (
                      d.value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <div className="mt-16 flex justify-center">
        <Button asChild variant="outline" size="sm" className="h-9 gap-2 pl-2 pr-3">
          <Link href={`/work/${next.slug}`} aria-label={`Next: ${next.name}`}>
            <Favicon src={nextMeta.favicon} logo={next.logo} icon={next.icon} size="xs" />
            <span className="text-t4">Next</span>
            <span>{next.name}</span>
            <Icon icon={ArrowRight01Icon} size={14} />
          </Link>
        </Button>
      </div>
    </article>
  );
}

/** Shades languages from solid to faint, largest first, keeping the bar monochrome. */
function langOpacity(name: string, languages: { name: string }[]) {
  const i = languages.findIndex((l) => l.name === name);
  return [1, 0.6, 0.38, 0.24, 0.14][i] ?? 0.1;
}

function plural(n: number, word: string) {
  return `${n} ${word}${n === 1 ? "" : "s"}`;
}
