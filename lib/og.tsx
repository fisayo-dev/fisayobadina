import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };

/** Shared 1200×630 social card in the site's light theme. */
export async function renderOg({ eyebrow, title, footer }: { eyebrow: string; title: string; footer: string }) {
  const font = (w: number) => readFile(join(process.cwd(), "public/fonts", `Aspekta-${w}.otf`));
  const [light, medium] = await Promise.all([font(350), font(500)]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 40,
          background: "#f6f6f4",
          fontFamily: "Aspekta",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 56,
            borderRadius: 28,
            border: "1px solid rgba(10,10,11,0.12)",
            background: "#ffffff",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, fontWeight: 500, color: "#0a0a0b" }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "#1a6bf0",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              F
            </div>
            {eyebrow}
          </div>
          <div style={{ fontSize: 76, fontWeight: 300, letterSpacing: "-0.045em", lineHeight: 1.05, color: "#0a0a0b", maxWidth: 960 }}>
            {title}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#5c5c63" }}>
            <span>{footer}</span>
            <span style={{ color: "#1a6bf0" }}>{new URL(site.url).host}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Aspekta", data: light, weight: 300, style: "normal" },
        { name: "Aspekta", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
