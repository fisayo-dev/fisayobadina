import Link from "next/link";
import { Download01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";

const links = [
  { href: "/#experience", label: "Experience" },
  { href: "/#products", label: "Products" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-2 px-4 sm:px-6">
        <Link href="/" className="mr-auto text-[15px] font-medium tracking-[-0.02em]">
          {site.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group inline-flex h-8 items-center rounded-lg px-3 text-[13px] font-medium text-t3 transition-colors hover:text-foreground"
            >
              <span className="roll">
                <span>{l.label}</span>
                <span aria-hidden="true">{l.label}</span>
              </span>
            </Link>
          ))}
        </nav>

        <ThemeToggle />
        <Button asChild size="sm">
          <a href={site.resume} download>
            Resume
            <Icon icon={Download01Icon} size={14} />
          </a>
        </Button>
      </div>
    </header>
  );
}
