import { ogSize, renderOg } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `${site.name} · ${site.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    eyebrow: site.name,
    title: "Software engineer building useful products for the web.",
    footer: `${site.role} · ${site.location}`,
  });
}
