import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight01Icon, Download01Icon, Location01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { BrandIcon } from "@/components/brand-icon";
import { Favicon } from "@/components/favicon";
import { Icon } from "@/components/icon";
import { JsonLd } from "@/components/json-ld";
import { Section } from "@/components/section";
import { StackIcons } from "@/components/stack";
import { social } from "@/lib/brands";
import { builds, hostOf, products, projects, type Project } from "@/lib/projects";
import { getSiteMeta, type SiteMeta } from "@/lib/site-meta";
import { experience, site, socials } from "@/lib/site";

export default async function Home() {
  const [metas, experienceMetas] = await Promise.all([
    Promise.all(projects.map((p) => getSiteMeta(p.url))),
    Promise.all(experience.map((e) => getSiteMeta(e.href))),
  ]);
  const metaBySlug = Object.fromEntries(projects.map((p, i) => [p.slug, metas[i]])) as Record<string, SiteMeta>;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": `${site.url}/#person`,
              name: site.name,
              alternateName: "Olufisayo Obadina",
              url: site.url,
              image: `${site.url}/fisayobadina.jpg`,
              jobTitle: site.role,
              email: `mailto:${site.email}`,
              address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
              alumniOf: { "@type": "CollegeOrUniversity", name: "Covenant University" },
              knowsAbout: ["TypeScript", "JavaScript", "Go", "Next.js", "React", "Node.js", "SQL"],
              sameAs: socials.filter((s) => s.name !== "WhatsApp").map((s) => s.href),
            },
            {
              "@type": "WebSite",
              "@id": `${site.url}/#website`,
              url: site.url,
              name: site.name,
              publisher: { "@id": `${site.url}/#person` },
            },
            {
              "@type": "ItemList",
              name: "Products and projects by Fisayo Obadina",
              itemListElement: projects.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `${site.url}/work/${p.slug}`,
                name: p.name,
              })),
            },
          ],
        }}
      />

      {/* Hero */}
      <div className="mx-auto max-w-5xl px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-20">
        <div className="flex items-center gap-3">
          <Image
            src="/fisayobadina.jpg"
            alt="Portrait of Fisayo Obadina"
            width={48}
            height={48}
            priority
            className="size-12 rounded-xl border border-line object-cover"
          />
          <div className="text-sm leading-tight">
            <p className="font-medium">{site.name}</p>
            <p className="mt-0.5 flex items-center gap-1 text-t3">
              <Icon icon={Location01Icon} size={13} />
              {site.location}
            </p>
          </div>
        </div>

        <h1 className="mt-8 max-w-3xl text-[38px] font-[350] leading-[1.04] tracking-[-0.045em] text-balance sm:mt-10 sm:text-[60px]">
          Software engineer building <span className="text-brand">useful products</span> for the web.
        </h1>
        <div className="mt-5 max-w-2xl space-y-3 text-base leading-relaxed text-t3 sm:text-[17px]">
          <p>
            I’m a full-stack engineer with 6+ years of experience, working mostly in TypeScript and Go. I’m studying at
            Covenant University, I ship products like Valent and Scanzie, and I won the JSM Mastery Hackathon in 2024.
          </p>
          <p>
            In 2026 I interned at <span className="text-foreground">GTCO</span>, researching offline payments over
            Bluetooth, and at <span className="text-foreground">SQUAD</span>, where I built the backend of an AI tool
            that automates customer support calls.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
          <Button asChild size="lg">
            <a href={`mailto:${site.email}`}>
              <Icon icon={Mail01Icon} />
              Get in touch
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={site.resume} download>
              <Icon icon={Download01Icon} />
              Download resume
            </a>
          </Button>
        </div>
      </div>

      {/* Experience */}
      <Section id="experience" title="Experience">
        <ul className="overflow-hidden rounded-(--radius-card) border border-line bg-panel">
          {experience.map((e, i) => (
            <li
              key={e.href}
              className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 border-t border-line px-4 py-5 first:border-t-0 sm:px-5 sm:py-6"
            >
              <Favicon src={experienceMetas[i].favicon} icon="briefcase" />
              <div className="min-w-0">
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <a
                    href={e.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1 font-medium tracking-[-0.02em] hover:text-brand"
                  >
                    {e.company}
                    <Arrow />
                  </a>
                  <span className="shrink-0 text-[13px] tabular-nums text-t3">{e.date}</span>
                </div>
                <p className="mt-0.5 text-sm text-t2">{e.role}</p>
                <p className="text-[13px] text-t4">{e.location}</p>
                <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-t3">
                  {e.points.map((point) => (
                    <li
                      key={point}
                      className="relative pl-4 before:absolute before:left-0 before:top-[0.65em] before:h-px before:w-2 before:bg-t4"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Products */}
      <Section id="products" title="Products">
        <ul className="grid gap-3 sm:grid-cols-2">
          {products.map((p) => (
            <li key={p.slug}>
              <ProductCard project={p} meta={metaBySlug[p.slug]} />
            </li>
          ))}
        </ul>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Projects">
        <ul className="overflow-hidden rounded-(--radius-card) border border-line bg-panel">
          {builds.map((p) => (
            <li key={p.slug} className="border-t border-line first:border-t-0">
              <ProjectRow project={p} meta={metaBySlug[p.slug]} />
            </li>
          ))}
        </ul>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Get in touch">
        <a
          href={`mailto:${site.email}`}
          className="group flex items-center gap-4 rounded-(--radius-card) border border-line bg-panel p-4 transition-colors hover:border-line-strong sm:p-5"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-[10px] bg-brand text-brand-ink">
            <Icon icon={Mail01Icon} size={20} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[13px] text-t3">Email</span>
            <span className="block truncate text-base font-medium tracking-[-0.02em] sm:text-xl">{site.email}</span>
          </span>
          <Arrow />
        </a>

        <ul className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
          {socials.map((s) => (
            <li key={s.name}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer me"
                className="group flex items-center gap-3 rounded-xl border border-line bg-panel p-3 transition-colors hover:border-line-strong"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-background text-foreground">
                  <BrandIcon brand={social[s.name as keyof typeof social]} size={17} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">{s.name}</span>
                  <span className="block truncate text-xs text-t3">{s.handle}</span>
                </span>
                <Arrow className="hidden sm:block" />
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <span
      className={`text-t4 transition-[color,transform] duration-200 ease-out-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground ${className}`}
    >
      <Icon icon={ArrowUpRight01Icon} size={16} />
    </span>
  );
}

function ProductCard({ project: p, meta }: { project: Project; meta: SiteMeta }) {
  return (
    <Link
      href={`/work/${p.slug}`}
      className="group flex h-full flex-col rounded-(--radius-card) border border-line bg-panel p-5 transition-colors hover:border-line-strong sm:p-6"
    >
      <div className="flex items-start justify-between">
        <Favicon src={meta.favicon} logo={p.logo} icon={p.icon} />
        <Arrow />
      </div>
      <h3 className="mt-5 text-lg font-medium tracking-[-0.03em]">{p.name}</h3>
      <p className="mt-0.5 font-mono text-xs text-t4">{hostOf(p.url)}</p>
      <p className="mt-3 text-[15px] leading-relaxed text-t3">{p.summary}</p>
      <StackIcons stack={p.stack} className="mt-auto pt-5" />
    </Link>
  );
}

function ProjectRow({ project: p, meta }: { project: Project; meta: SiteMeta }) {
  return (
    <Link
      href={`/work/${p.slug}`}
      className="group grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-4 px-4 py-4 transition-colors hover:bg-foreground/2.5 sm:px-5 md:grid-cols-[auto_minmax(0,1fr)_14rem_auto] md:items-center"
    >
      <Favicon src={meta.favicon} logo={p.logo} icon={p.icon} size="sm" />
      <span className="min-w-0">
        <span className="flex items-baseline gap-2">
          <span className="font-medium tracking-[-0.02em]">{p.name}</span>
          <span className="hidden truncate font-mono text-xs text-t4 sm:inline">{hostOf(p.url)}</span>
        </span>
        <span className="mt-0.5 block text-sm leading-snug text-t3">{p.summary}</span>
        <span className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 md:hidden">
          <StackIcons stack={p.stack} />
          {p.event && <span className="text-[13px] text-t4">{p.event}</span>}
        </span>
      </span>
      <span className="hidden flex-col items-end gap-2 md:flex">
        <StackIcons stack={p.stack} className="justify-end" />
        {p.event && <span className="text-right text-[13px] text-t3">{p.event}</span>}
      </span>
      <Arrow className="self-start md:self-center" />
    </Link>
  );
}