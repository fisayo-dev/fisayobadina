import type { Brand } from "@/lib/brands";

/** Relative luminance of a hex colour, 0 (black) to 1 (white). */
function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * A brand mark in its own colour. Near-black and near-white brands (Next.js,
 * GitHub, X, Express, Drizzle) use the text colour so they stay visible in
 * both themes.
 */
export function BrandIcon({ brand, size = 16, className }: { brand: Brand; size?: number; className?: string }) {
  const l = luminance(brand.hex);
  const fill = l < 0.03 || l > 0.6 ? "currentColor" : `#${brand.hex}`;
  return (
    <svg
      role="img"
      aria-label={brand.title}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={fill}
      className={className}
    >
      <path d={brand.path} />
    </svg>
  );
}
