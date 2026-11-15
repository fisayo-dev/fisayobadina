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
  url: string;
  /** One-line summary, taken from the GitHub profile README. */
  summary: string;
  /** Hackathon or event the project was built for. */
  event?: string;
  stack?: string[];
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
    icon: "briefcase",
  },
  {
    slug: "full-stack-creators",
    name: "Full-stack Creators",
    kind: "product",
    url: "https://thefullstackcreators.com",
    summary: "A freelance platform for students. Find gigs, hire talent and get paid.",
    logo: "/logos/fsc.svg",
    icon: "users",
  },
  {
    slug: "creativia",
    name: "Creativia",
    kind: "product",
    url: "https://creativia-eight.vercel.app",
    summary: "A word game designed to test students' creativity.",
    stack: ["Next.js", "TypeScript"],
    logo: "/logos/creativia.png",
    icon: "puzzle",
  },
  {
    slug: "scanzie",
    name: "Scanzie",
    kind: "product",
    url: "https://scanzie.vercel.app",
    summary: "SEO analytics for developers and website owners. Analyses your website's SEO.",
    stack: ["TypeScript"],
    logo: "/logos/scanzie.png",
    icon: "search",
  },
  {
    slug: "spendlens",
    name: "Spendlens",
    kind: "project",
    url: "https://spendlensng.vercel.app/",
    summary: "A financial advisor that helps people allocate their money well, with an API banks can integrate.",
    icon: "wallet",
  },
  {
    slug: "ledger",
    name: "Ledger",
    kind: "project",
    url: "https://ledger-21394e.rumptycloud.app",
    summary: "An AI ledger that evaluates every AI model call and scores its performance.",
    icon: "ledger",
  },
  {
    slug: "sura-for-banks",
    name: "Sura for Banks",
    kind: "project",
    url: "https://sura-seven.vercel.app/",
    summary: "A credit-scoring system that helps banks issue loans accurately.",
    event: "Ecobank Hackathon",
    stack: ["Next.js", "Python"],
    logo: "/logos/sura.png",
    icon: "credit",
  },
  {
    slug: "sura-for-users",
    name: "Sura for Users",
    kind: "project",
    url: "https://surausers.vercel.app/",
    summary: "Tracks spending behaviour so people can build the credit history they need for loans.",
    event: "Ecobank Hackathon",
    stack: ["Next.js", "Python"],
    logo: "/logos/sura.png",
    icon: "credit",
  },
  {
    slug: "verifyng",
    name: "VerifyNG",
    kind: "project",
    url: "https://verifyng-three.vercel.app/",
    summary: "A certificate verification tool that checks academic certificates and flags fraud.",
    event: "Squad Hackathon 3.0",
    stack: ["Next.js", "Python"],
    icon: "certificate",
  },
  {
    slug: "proofpay",
    name: "Proofpay",
    kind: "project",
    url: "https://proofpay-ai.vercel.app/",
    summary: "A verified marketplace for vendors and buyers.",
    event: "Kora Hackathon",
    icon: "shield",
  },
  {
    slug: "loan-parser",
    name: "Loan Parser",
    kind: "project",
    url: "https://loanparser.vercel.app/",
    summary: "A loan-parsing system for lenders and banks that turns loan documents into structured data.",
    event: "LMA Edge Hackathon 2026",
    stack: ["Go", "TypeScript"],
    logo: "/logos/loanparser.png",
    icon: "document",
  },
  {
    slug: "rss-aggregator",
    name: "RSS Aggregator",
    kind: "project",
    url: "https://github.com/fisayo-dev/rssagg",
    summary: "A blog RSS feed aggregator.",
    stack: ["Go"],
    icon: "rss",
  },
  {
    slug: "medic-translate",
    name: "Medic Translate",
    kind: "project",
    url: "https://medictranslate-enyata.vercel.app/",
    summary: "An AI-powered medical chatbot that explains lab test results in plain language.",
    event: "Interswitch × Enyata Hackathon",
    stack: ["TypeScript", "Python"],
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
