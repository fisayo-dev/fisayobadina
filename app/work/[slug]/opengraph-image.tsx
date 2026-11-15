import { ogSize, renderOg } from "@/lib/og";
import { getProject, hostOf, projects } from "@/lib/projects";
import { site } from "@/lib/site";

export const alt = `A project by ${site.name}`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug)!;
  return renderOg({
    eyebrow: `${project.name} · ${project.kind === "product" ? "Product" : "Project"}`,
    title: project.summary,
    footer: `${hostOf(project.url)}${project.event ? ` · ${project.event}` : ""}`,
  });
}
