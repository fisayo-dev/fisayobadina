import { cn } from "@/lib/utils";

/** A full-width band with hairline rules, framed by the page's side rails. */
export function Section({
  id,
  title,
  children,
  className,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className="border-t border-line">
      <div className={cn("mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16", className)}>
        <h2
          id={id ? `${id}-title` : undefined}
          className="mb-6 text-2xl font-[450] tracking-[-0.035em] sm:mb-8 sm:text-[28px]"
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
