// app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const spaceGrotesk = localFont({
  src: "../public/fonts/SpaceGrotesk-Regular.ttf",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Fisayo Obadina",
  description: "Software Engineer | Fullstack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} antialiased`}>
          <div className="max-w-4xl mx-auto px-5 lg:px-20 py-20">
            {" "}
            {children}
          </div>
      </body>
    </html>
  );
}
