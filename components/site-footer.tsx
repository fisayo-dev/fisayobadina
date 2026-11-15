import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-[13px] text-t3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <span>
          © {new Date().getFullYear()} {site.name}. Built in {site.location}.
        </span>
        <span className="flex gap-4">
          <Link href="/#projects" className="hover:text-foreground">Projects</Link>
          <a href="https://github.com/fisayo-dev" target="_blank" rel="noreferrer" className="hover:text-foreground">GitHub</a>
          <a href={`mailto:${site.email}`} className="hover:text-foreground">Email</a>
        </span>
      </div>
    </footer>
  );
}
