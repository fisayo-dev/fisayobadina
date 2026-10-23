import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  ArrowUpRight01Icon,
  Bookmark02Icon,
  CertificateIcon,
  CodeFolderIcon,
  Download01Icon,
  Facebook02Icon,
  Github01Icon,
  InstagramIcon,
  JobSearchIcon,
  Linkedin01Icon,
  Location01Icon,
  Mail01Icon,
  NewTwitterIcon,
  RssIcon,
  ShoppingBag01Icon,
  TestTube01Icon,
  UserGroupIcon,
  WhatsappIcon,
} from "@hugeicons/core-free-icons";

interface Project {
  link: string;
  name: string;
  description: string;
  language: string;
  event?: string;
  image?: string;
  icon?: IconSvgElement;
}

interface Startup {
  link: string;
  name: string;
  role: string;
  date: string;
  logo?: string;
}

interface Social {
  name: string;
  handle: string;
  href: string;
  icon: IconSvgElement;
}

const projects: Project[] = [
  { link: "https://creativia-eight.vercel.app/", name: "Creativia", description: "A remote-associate test game built to test creative thinking.", language: "Next.js & TypeScript", image: "/logos/creativia.png" },
  { link: "https://surausers.vercel.app/", name: "Sura — For Users", description: "A credit-scoring system that tracks spending behaviour and helps people build credit for loans.", language: "Next.js & Python", event: "Ecobank Hackathon", image: "/logos/sura.png" },
  { link: "https://sura-seven.vercel.app/", name: "Sura — For Banks", description: "A credit-scoring API banks can use to evaluate creditworthiness from spending activity.", language: "Next.js & Python", event: "Ecobank Hackathon", image: "/logos/sura.png" },
  { link: "https://verifyng-three.vercel.app/", name: "VerifyNG", description: "An AI-powered platform for verifying academic certificates and detecting fraud.", language: "Next.js & Python", event: "Squad Hackathon", icon: CertificateIcon },
  { link: "https://medictranslate-enyata.vercel.app/", name: "Medic Translate", description: "An AI-powered tool for interpreting medical lab results.", language: "TypeScript & Python", event: "Interswitch × Enyata", icon: TestTube01Icon },
  { link: "https://scanzie.vercel.app", name: "Scanzie", description: "An SEO web analytics platform.", language: "TypeScript", image: "/logos/scanzie.png" },
  { link: "https://loanparser.vercel.app", name: "Loan Parser", description: "Scans loan documents with AI and parses them into JSON or CSV.", language: "Go & TypeScript", image: "/logos/loanparser.png" },
  { link: "https://github.com/fisayo-dev/rssagg", name: "RSS Feed Aggregator", description: "A simple RSS feed aggregator for blogs.", language: "Go", icon: RssIcon },
  { link: "https://bookmark-hub-lilac.vercel.app/", name: "Bookmark Hub", description: "A simple space to save and organise your bookmark links.", language: "Next.js", icon: Bookmark02Icon },
  { link: "https://raccvoting.vercel.app/", name: "Racc", description: "An online voting space.", language: "React", event: "JSM Hackathon", image: "/logos/racc.png" },
  { link: "https://github.com/fisayo-dev/shopping_app_api", name: "Shop App API", description: "A modern shopping application API.", language: "Node.js", icon: ShoppingBag01Icon },
  { link: "https://searchjob.vercel.app/", name: "Joblier", description: "A community for the job market.", language: "React", icon: UserGroupIcon },
  { link: "https://seekjob.vercel.app/", name: "Seekjob", description: "A platform for people looking for their next role.", language: "React", image: "/logos/seekjob.png" },
];

const startups: Startup[] = [
  { link: "https://thefullstackcreators.com", name: "The Full Stack Creators", role: "Developer community", date: "Apr 2025 — Present", logo: "/logos/fsc.svg" },
  { link: "https://pickogen.online", name: "Pickogen", role: "Design stock assets", date: "Nov — Dec 2025", logo: "/logos/pickogen.png" },
  { link: "https://printeaze.com", name: "Printeaze", role: "Campus printing", date: "Mar — May 2025", logo: "/logos/printeaze.png" },
];

const socials: Social[] = [
  { name: "GitHub", handle: "fisayo-dev", href: "https://github.com/fisayo-dev", icon: Github01Icon },
  { name: "LinkedIn", handle: "fisayobadina", href: "https://linkedin.com/in/fisayobadina", icon: Linkedin01Icon },
  { name: "X", handle: "@fisaycoder", href: "https://x.com/fisaycoder", icon: NewTwitterIcon },
  { name: "Instagram", handle: "@fisayobadina", href: "https://instagram.com/fisayobadina", icon: InstagramIcon },
  { name: "Facebook", handle: "olufisayo.obadina", href: "https://web.facebook.com/olufisayo.obadina", icon: Facebook02Icon },
  { name: "WhatsApp", handle: "Send a message", href: "https://wa.me/234906978308", icon: WhatsappIcon },
];

const email = "olufisayobadina@gmail.com";

function Icon({ icon, size = 16 }: { icon: IconSvgElement; size?: number }) {
  return <HugeiconsIcon icon={icon} size={size} strokeWidth={1.5} aria-hidden="true" />;
}

function SectionHeader({ index, title, aside }: { index: string; title: string; aside?: string }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      {aside && <span className="section-aside">{aside}</span>}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <nav className="topbar" aria-label="Primary">
        <div className="topbar-inner">
          <Link href="/" className="brand">Fisayo Obadina</Link>
          <div className="topbar-links">
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </div>
          <a className="button button-small" href="/docs/resume.pdf" download>
            Resume
            <Icon icon={Download01Icon} size={14} />
          </a>
        </div>
      </nav>

      <main className="portfolio">
        <header className="hero">
          <div className="portrait-wrap">
            <Image src="/fisayobadina.jpg" alt="Fisayo Obadina" fill priority sizes="(max-width: 640px) 72px, 96px" className="portrait" />
          </div>
          <p className="eyebrow">
            <Icon icon={Location01Icon} size={14} />
            Lagos, Nigeria
          </p>
          <h1>Fisayo Obadina</h1>
          <p className="hero-line">Software engineer building thoughtful products for the web.</p>
          <div className="intro">
            <p>I’m Fisayo, a full-stack engineer with 6+ years of experience. I love solving problems with code and turning ideas into useful products.</p>
            <p>I work mostly with <strong>JavaScript and TypeScript</strong>, and I’m exploring <strong>Go, Rust and C++</strong>. I’ve competed in the Squad and Interswitch hackathons, and won the <strong>JSM Mastery Hackathon</strong> in 2024.</p>
          </div>
          <div className="hero-actions">
            <a className="button" href={`mailto:${email}`}>
              Get in touch
              <Icon icon={Mail01Icon} />
            </a>
            <a className="button button-outline" href="/docs/resume.pdf" download>
              Download resume
              <Icon icon={Download01Icon} />
            </a>
          </div>
        </header>

        <section id="projects" className="section">
          <SectionHeader index="01" title="Selected projects" aside={`${projects.length} projects`} />
          <div className="project-grid">
            {projects.map((project) => (
              <Link target="_blank" rel="noreferrer" href={project.link} key={project.link} className="card project-card">
                <div className="project-head">
                  <span className="tile">
                    {project.image ? (
                      <Image src={project.image} alt="" width={40} height={40} className="tile-image" />
                    ) : (
                      <Icon icon={project.icon ?? CodeFolderIcon} size={22} />
                    )}
                  </span>
                  <span className="card-arrow">
                    <Icon icon={ArrowUpRight01Icon} size={18} />
                  </span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="tags">
                  <span className="tag">{project.language}</span>
                  {project.event && <span className="tag tag-plain">{project.event}</span>}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="experience" className="section">
          <SectionHeader index="02" title="Startup experience" />
          <p className="section-intro">Teams I’ve worked with to build and grow products.</p>
          <div className="row-list">
            {startups.map((startup) => (
              <Link target="_blank" rel="noreferrer" href={startup.link} key={startup.link} className="row">
                <span className="tile">
                  {startup.logo ? (
                    <Image src={startup.logo} alt="" width={40} height={40} className="tile-image" />
                  ) : (
                    <Icon icon={JobSearchIcon} size={22} />
                  )}
                </span>
                <span className="row-copy">
                  <h3>{startup.name}</h3>
                  <span>{startup.role}</span>
                </span>
                <span className="row-date">{startup.date}</span>
                <span className="card-arrow">
                  <Icon icon={ArrowUpRight01Icon} size={18} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section id="contact" className="section">
          <SectionHeader index="03" title="Find me around the web" />
          <p className="section-intro">Say hello, follow along, or take a look at what I’m building.</p>
          <a href={`mailto:${email}`} className="card email-card">
            <span className="tile tile-solid">
              <Icon icon={Mail01Icon} size={22} />
            </span>
            <span className="email-copy">
              <span className="email-label">Email me</span>
              <span className="email-address">{email}</span>
            </span>
            <span className="card-arrow">
              <Icon icon={ArrowUpRight01Icon} size={18} />
            </span>
          </a>
          <div className="social-grid">
            {socials.map((social) => (
              <Link href={social.href} target="_blank" rel="noreferrer" key={social.name} className="card social-card">
                <span className="tile tile-small">
                  <Icon icon={social.icon} size={18} />
                </span>
                <span className="social-copy">
                  <span className="social-name">{social.name}</span>
                  <span className="social-handle">{social.handle}</span>
                </span>
                <span className="card-arrow">
                  <Icon icon={ArrowUpRight01Icon} size={16} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <footer className="footer">
          <span>© {new Date().getFullYear()} Fisayo Obadina</span>
          <span>Keep building.</span>
        </footer>
      </main>
    </>
  );
}
