import {
  siDrizzle,
  siExpress,
  siFacebook,
  siFastapi,
  siGithub,
  siGo,
  siInstagram,
  siNextdotjs,
  siNodedotjs,
  siOpencv,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siWhatsapp,
  siX,
} from "simple-icons";

export type Brand = { title: string; path: string; hex: string };

// LinkedIn was removed from simple-icons, so its mark is kept here.
const siLinkedin: Brand = {
  title: "LinkedIn",
  hex: "0A66C2",
  path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
};

export const tech = {
  nextjs: { ...siNextdotjs, title: "Next.js" },
  react: siReact,
  typescript: siTypescript,
  tailwind: { ...siTailwindcss, title: "Tailwind CSS" },
  nodejs: { ...siNodedotjs, title: "Node.js" },
  express: siExpress,
  go: siGo,
  python: siPython,
  fastapi: siFastapi,
  opencv: siOpencv,
  postgresql: siPostgresql,
  drizzle: { ...siDrizzle, title: "Drizzle ORM" },
  redis: siRedis,
  supabase: siSupabase,
} satisfies Record<string, Brand>;

export type TechKey = keyof typeof tech;

export const social = {
  GitHub: siGithub,
  LinkedIn: siLinkedin,
  X: siX,
  Instagram: siInstagram,
  Facebook: siFacebook,
  WhatsApp: siWhatsapp,
} satisfies Record<string, Brand>;

export const github: Brand = siGithub;
