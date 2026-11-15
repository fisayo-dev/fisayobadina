"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { FallbackIcon } from "@/lib/projects";
import { Icon, fallbackIcons } from "@/components/icon";

type Props = {
  /** Favicon resolved from the live site, if any. */
  src?: string;
  /** Local logo to try when the favicon is missing or fails to load. */
  logo?: string;
  icon: FallbackIcon;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
};

const box = { xs: "size-5 rounded-[5px]", sm: "size-9 rounded-lg", md: "size-11 rounded-[10px]", lg: "size-16 rounded-xl" };
const img = { xs: "size-3.5", sm: "size-5", md: "size-6", lg: "size-9" };
const glyph = { xs: 12, sm: 18, md: 20, lg: 28 };

/**
 * Shows a project's favicon. Falls back to the local logo, then to a
 * Hugeicons glyph, whenever an image is missing or fails to load.
 */
export function Favicon({ src, logo, icon, size = "md", className }: Props) {
  const sources = [src, logo].filter((s): s is string => Boolean(s));
  const [index, setIndex] = useState(0);
  const current = sources[index];

  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center overflow-hidden border border-line text-t2",
        // Many favicons are dark-on-transparent, so images always sit on a light tile.
        current ? "bg-white dark:border-transparent" : "bg-panel",
        box[size],
        className,
      )}
    >
      {current ? (
        // eslint-disable-next-line @next/next/no-img-element -- remote favicons from arbitrary hosts
        <img
          key={current}
          src={current}
          alt=""
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className={cn("object-contain", img[size])}
          onError={() => setIndex((i) => i + 1)}
        />
      ) : (
        <Icon icon={fallbackIcons[icon]} size={glyph[size]} />
      )}
    </span>
  );
}
