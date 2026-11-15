import { BrandIcon } from "@/components/brand-icon";
import { tech, type TechKey } from "@/lib/brands";
import { cn } from "@/lib/utils";

/** Compact row of stack logos, for cards and list rows. */
export function StackIcons({ stack, className }: { stack: TechKey[]; className?: string }) {
  if (!stack.length) return null;
  return (
    <ul className={cn("flex flex-wrap items-center gap-2.5 text-foreground", className)} aria-label="Tech stack">
      {stack.map((key) => (
        <li key={key} title={tech[key].title} className="flex">
          <BrandIcon brand={tech[key]} size={15} />
        </li>
      ))}
    </ul>
  );
}

/** Labelled stack tiles, for the project page. */
export function StackGrid({ stack }: { stack: TechKey[] }) {
  return (
    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {stack.map((key) => (
        <li
          key={key}
          className="flex items-center gap-3 rounded-xl border border-line bg-panel px-3 py-2.5 text-foreground"
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-line bg-background">
            <BrandIcon brand={tech[key]} size={16} />
          </span>
          <span className="truncate text-sm font-medium">{tech[key].title}</span>
        </li>
      ))}
    </ul>
  );
}
