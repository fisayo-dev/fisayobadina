export const site = {
  name: "Fisayo Obadina",
  url: "https://fisayobadina.vercel.app",
  role: "Full-stack Software Engineer",
  location: "Lagos, Nigeria",
  email: "olufisayobadina@gmail.com",
  description:
    "Fisayo Obadina is a full-stack software engineer in Lagos, Nigeria, building products with TypeScript, Next.js and Go. See Valent, Spendlens, Ledger, Scanzie and other products and hackathon projects.",
  twitter: "@fisaycoder",
  resume: "/docs/resume.pdf",
} as const;

export type Social = {
  name: string;
  handle: string;
  href: string;
};

export const socials: Social[] = [
  { name: "GitHub", handle: "fisayo-dev", href: "https://github.com/fisayo-dev" },
  { name: "LinkedIn", handle: "fisayobadina", href: "https://linkedin.com/in/fisayobadina" },
  { name: "X", handle: "@fisaycoder", href: "https://x.com/fisaycoder" },
  { name: "Instagram", handle: "@fisayobadina", href: "https://instagram.com/fisayobadina" },
  { name: "Facebook", handle: "olufisayo.obadina", href: "https://web.facebook.com/olufisayo.obadina" },
  { name: "WhatsApp", handle: "Send a message", href: "https://wa.me/234906978308" },
];

export type Experience = {
  company: string;
  href: string;
  role: string;
  location: string;
  date: string;
  points: string[];
};

/** From the resume at /public/docs/resume.pdf. */
export const experience: Experience[] = [
  {
    company: "Guaranty Trust Holding Company (GTCO)",
    href: "https://www.gtcoplc.com/",
    role: "Summer Intern, Software Engineering",
    location: "Lagos, Nigeria · Hybrid",
    date: "Jul — Sep 2026",
    points: [
      "Researched an offline payment solution that lets GTCO customers complete transactions over Bluetooth without an internet connection.",
      "Presented the capstone project to GTCO stakeholders, explaining the system architecture and business impact to technical and non-technical audiences.",
    ],
  },
  {
    company: "SQUAD (Habari Pay)",
    href: "https://squadco.com/",
    role: "Back End Developer Intern",
    location: "Lagos Island, Lagos · Hybrid",
    date: "Jul — Sep 2026",
    points: [
      "Owned the full backend of an AI-powered support tool that automates outbound calls for SQUAD's customer support team.",
      "Built server-side services and APIs that integrate AI models for call initiation, conversation handling and support workflows.",
    ],
  },
];
