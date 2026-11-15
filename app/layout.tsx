import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";
import "./globals.css";

const aspekta = localFont({
  src: [
    { path: "../public/fonts/Aspekta-300.otf", weight: "300" },
    { path: "../public/fonts/Aspekta-350.otf", weight: "350" },
    { path: "../public/fonts/Aspekta-400.otf", weight: "400" },
    { path: "../public/fonts/Aspekta-450.otf", weight: "450" },
    { path: "../public/fonts/Aspekta-500.otf", weight: "500" },
    { path: "../public/fonts/Aspekta-600.otf", weight: "600" },
  ],
  variable: "--font-aspekta",
  display: "swap",
});

const title = `${site.name} · ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Fisayo Obadina",
    "Olufisayo Obadina",
    "full-stack developer",
    "software engineer Nigeria",
    "Next.js developer",
    "TypeScript engineer",
    "Go developer",
    "Lagos software engineer",
    "hackathon projects",
    "Valent",
    "Spendlens",
    "Scanzie",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    firstName: "Fisayo",
    lastName: "Obadina",
    username: "fisayo-dev",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    creator: site.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: { icon: "/favicon.ico", apple: "/fisayobadina.jpg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f6f4" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${aspekta.variable} flex min-h-dvh flex-col`}>
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-panel focus:px-3 focus:py-2 focus:text-sm"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
