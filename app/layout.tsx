// app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const spaceGrotesk = localFont({
  src: "../public/fonts/SpaceGrotesk-Regular.ttf",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: {
    default: "Fisayo Obadina - Fullstack Software Engineer",
    template: "%s | Fisayo Obadina - Fullstack Software Engineer",
  },
  description:
    "Fisayo Obadina is a passionate Fullstack Software Engineer specializing in building scalable web applications with modern technologies like React, Next.js, Node.js, and more. Explore my projects, experience, and blog.",
  keywords: [
    "Fisayo Obadina",
    "fullstack developer",
    "software engineer",
    "React developer",
    "Next.js developer",
    "JavaScript engineer",
    "web developer portfolio",
    "Nigeria software engineer",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  authors: [{ name: "Fisayo Obadina" }],
  creator: "Fisayo Obadina",
  publisher: "Fisayo Obadina",
  metadataBase: new URL("https://fisayobadina.vercel.app/"), // Replace with your actual domain, e.g., https://fisayoobadina.com
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Fisayo Obadina - Fullstack Software Engineer",
    description:
      "Fullstack Software Engineer | Expert in React, Next.js, Node.js | Building innovative web solutions | Learning Go & Rust",
    url: "https://fisayobadina.vercel.app/",
    siteName: "Fisayo Obadina Portfolio",
    images: [
      {
        url: "/fisayobadina.jpg", // Recommended: Create a custom Open Graph image (1200x630) with your name/photo
        width: 1200,
        height: 630,
        alt: "Fisayo Obadina - Fullstack Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fisayo Obadina - Fullstack Software Engineer",
    description:
      "Fullstack Software Engineer passionate about crafting high-quality web applications. Learnign Go & Rust.",
    images: ["/fisayobadina.jpg"], // Optional: Separate or same as OG image
    creator: "@fisayocoder", // From your GitHub/X profile
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <div className="max-w-4xl mx-auto px-5 lg:px-20 py-20"> {children}</div>
      </body>
    </html>
  );
}
