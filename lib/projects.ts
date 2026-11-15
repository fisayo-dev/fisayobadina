import type { TechKey } from "@/lib/brands";

export type ProjectKind = "product" | "project";

export type FallbackIcon =
  | "briefcase"
  | "users"
  | "puzzle"
  | "search"
  | "wallet"
  | "ledger"
  | "credit"
  | "certificate"
  | "shield"
  | "document"
  | "rss"
  | "lab";

export type Project = {
  slug: string;
  name: string;
  kind: ProjectKind;
  /** Live site, or the repository when there is no live site. */
  url: string;
  /** Public GitHub repository, "owner/name". */
  repo?: string;
  /** One-line summary for cards and lists (from the GitHub profile README). */
  summary: string;
  /** Longer write-up for the project page, from the repo README, resume and live site. */
  description: string;
  /** Resume bullet points, where the resume covers the project. */
  highlights?: string[];
  /** Role on the project, from the resume. */
  role?: string;
  /** Hackathon or event the project was built for. */
  event?: string;
  /** Stack, from the repo's dependencies or the live site's framework. */
  stack: TechKey[];
  /** Local logo used when the live site exposes no favicon. */
  logo?: string;
  /** Hugeicons glyph used when there is neither a favicon nor a logo. */
  icon: FallbackIcon;
};

export const projects: Project[] = [
  {
    slug: "valent",
    name: "Valent",
    kind: "product",
    url: "https://www.hirevalent.com/",
    summary: "A fast hiring marketplace for startups. Find quality talent, from engineers to sales.",
    description:
      "Valent matches startups with exceptional talent. A startup posts a role and gets a shortlist within 24 hours. Talent onboards once and gets picked for interviews. It is free for both sides.",
    stack: ["nextjs"],
    icon: "briefcase",
  },
  {
    slug: "full-stack-creators",
    name: "Full-stack Creators",
    kind: "product",
    url: "https://thefullstackcreators.com",
    summary: "A freelance platform for students. Find gigs, hire talent and get paid.",
    description:
      "A campus freelance marketplace where students find gigs, hire other students and get paid, without leaving the campus community.",
    highlights: [
      "Built user interface features for a student-to-student freelance marketplace.",
      "Improved page SEO and load performance using Scanzie.",
    ],
    role: "Frontend Developer",
    stack: [],
    logo: "/logos/fsc.svg",
    icon: "users",
  },
  {
    slug: "creativia",
    name: "Creativia",
    kind: "product",
    url: "https://creativia-eight.vercel.app",
    repo: "fisayo-dev/creativia",
    summary: "A word game designed to test students' creativity.",
    description:
      "A gamified remote associates test. You see three words, find the one word that links them, and climb from very easy to very hard. Scores can be shared as an image, and players can support the game through Paystack, Squad or Bachs.",
    stack: ["nextjs", "typescript"],
    logo: "/logos/creativia.png",
    icon: "puzzle",
  },
  {
    slug: "scanzie",
    name: "Scanzie",
    kind: "product",
    url: "https://scanzie.vercel.app",
    repo: "fisayo-dev/scanzie-web",
    summary: "SEO analytics for developers and website owners. Analyses your website's SEO.",
    description:
      "An open-source SEO analyzer with a web dashboard and a REST Analyzer API. It checks page speed, meta tags, keyword density and accessibility, then gives prioritised suggestions to fix what it finds.",
    highlights: [
      "Built an open-source SEO analyzer that runs automated visibility and health checks on websites.",
      "Designed backend processing for efficient SEO audits, reducing total analysis time per site.",
    ],
    role: "Full-Stack Developer",
    stack: ["nextjs", "typescript", "nodejs", "express", "postgresql", "drizzle", "redis"],
    logo: "/logos/scanzie.png",
    icon: "search",
  },
  {
    slug: "spendlens",
    name: "Spendlens",
    kind: "project",
    url: "https://spendlensng.vercel.app/",
    summary: "A financial advisor that helps people allocate their money well, with an API banks can integrate.",
    description:
      "An API-first spending review for banks and fintech apps. It imports transactions, protects essential costs and tests a savings plan. Code does every calculation; AI only explains the result.",
    event: "Kora BIP Hackathon",
    stack: ["nextjs"],
    icon: "wallet",
  },
  {
    slug: "ledger",
    name: "Ledger",
    kind: "project",
    url: "https://ledger-21394e.rumptycloud.app",
    summary: "An AI ledger that evaluates every AI model call and scores its performance.",
    description:
      "Release evidence for LLM applications. Ledger records cost and risk on every AI call without slowing it down, scores each model change against a versioned answer key, and blocks releases that regress.",
    stack: ["nextjs"],
    icon: "ledger",
  },
  {
    slug: "sura-for-banks",
    name: "Sura for Banks",
    kind: "project",
    url: "https://sura-seven.vercel.app/",
    summary: "A credit-scoring system that helps banks issue loans accurately.",
    description:
      "A credit-scoring API that banks can use to judge creditworthiness from spending activity, so they can issue loans with more confidence.",
    event: "Ecobank Hackathon",
    stack: ["nextjs", "python"],
    logo: "/logos/sura.png",
    icon: "credit",
  },
  {
    slug: "sura-for-users",
    name: "Sura for Users",
    kind: "project",
    url: "https://surausers.vercel.app/",
    summary: "Tracks spending behaviour so people can build the credit history they need for loans.",
    description:
      "The consumer side of Sura. It tracks spending behaviour and turns it into a credit profile, helping people build the history they need to qualify for loans.",
    event: "Ecobank Hackathon",
    stack: ["nextjs", "python"],
    logo: "/logos/sura.png",
    icon: "credit",
  },
  {
    slug: "verifyng",
    name: "VerifyNG",
    kind: "project",
    url: "https://verifyng-three.vercel.app/",
    repo: "fisayo-dev/verifyng",
    summary: "A certificate verification tool that checks academic certificates and flags fraud.",
    description:
      "AI-powered academic certificate verification for Nigerian employers, schools and recruiters. A user uploads a certificate, pays the verification fee through Squad, and gets an explainable trust score with a verdict, confidence level and risk flags.",
    highlights: [
      "Built the entire user interface for a platform that verifies academic and professional certificates.",
      "Implemented an AI-powered verification API for fraud and deepfake detection in submitted certificates.",
    ],
    role: "Frontend Developer",
    event: "Squad Hackathon 3.0",
    stack: ["nextjs", "typescript", "python", "fastapi", "opencv"],
    icon: "certificate",
  },
  {
    slug: "proofpay",
    name: "Proofpay",
    kind: "project",
    url: "https://proofpay-ai.vercel.app/",
    repo: "fisayo-dev/proofpay-ai",
    summary: "A verified marketplace for vendors and buyers.",
    description:
      "AI-verified payment requests for student vendors and social-commerce sellers. Buyers check a seller's explainable trust score before paying, and payments run through Kora Checkout.",
    highlights: [
      "Developed the marketplace interface for a secure, escrow-style shopping experience.",
      "Implemented accessibility features to support users with disabilities across key flows.",
    ],
    role: "Frontend Developer",
    event: "Kora Hackathon 2.0",
    stack: ["nextjs", "typescript", "tailwind", "python", "fastapi", "supabase"],
    icon: "shield",
  },
  {
    slug: "loan-parser",
    name: "Loan Parser",
    kind: "project",
    url: "https://loanparser.vercel.app/",
    repo: "fisayo-dev/loan-parser",
    summary: "A loan-parsing system for lenders and banks that turns loan documents into structured data.",
    description:
      "Parses loan agreements into a standard JSON or CSV schema that loan software can import, and explains the complex jargon inside them. A Go backend does the parsing behind a Next.js frontend.",
    highlights: [
      "Developed an end-to-end application that parses loan documents into structured JSON and CSV.",
      "Integrated a third-party AI API for document parsing and analysis across varied document formats.",
    ],
    role: "Full-Stack Developer",
    event: "LMA Edge Hackathon 2026",
    stack: ["go", "nextjs", "typescript"],
    logo: "/logos/loanparser.png",
    icon: "document",
  },
  {
    slug: "rss-aggregator",
    name: "RSS Aggregator",
    kind: "project",
    url: "https://github.com/fisayo-dev/rssagg",
    repo: "fisayo-dev/rssagg",
    summary: "A blog RSS feed aggregator.",
    description:
      "A backend API that pulls posts from many RSS feeds into one place. Written entirely in Go with the chi router, PostgreSQL, sqlc for type-safe queries and goose for migrations.",
    stack: ["go", "postgresql"],
    icon: "rss",
  },
  {
    slug: "medic-translate",
    name: "Medic Translate",
    kind: "project",
    url: "https://medictranslate-enyata.vercel.app/",
    summary: "An AI-powered medical chatbot that explains lab test results in plain language.",
    description:
      "Upload a photo of a lab result and get it explained in clear language. It translates medical terminology so people can understand their own test results.",
    event: "Interswitch × Enyata Hackathon",
    stack: ["nextjs", "typescript", "python"],
    icon: "lab",
  },
];

export const products = projects.filter((p) => p.kind === "product");
export const builds = projects.filter((p) => p.kind === "project");

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function hostOf(url: string) {
  return new URL(url).host.replace(/^www\./, "");
}

export function isRepoOnly(p: Project) {
  return new URL(p.url).host === "github.com";
}
