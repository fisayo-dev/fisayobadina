import { cn } from "@/lib/utils";

/** A full-width band with hairline rules, framed by the page's side rails. */
export function Section({
  id,
  title,
  intro,
  children,
  className,
}: {
  id?: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className="border-t border-line">
      <div className={cn("mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16", className)}>
        <div className="mb-6 flex flex-col gap-1.5 sm:mb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <h2 id={id ? `${id}-title` : undefined} className="text-2xl font-[450] tracking-[-0.035em] sm:text-[28px]">
            {title}
          </h2>
          {intro && <p className="max-w-sm text-[15px] leading-relaxed text-t3 sm:text-right">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
