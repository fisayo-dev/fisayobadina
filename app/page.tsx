import Image from "next/image";
import Link from "next/link";

interface Projects {
  link: string;
  name: string;
  description: string;
  image?: string;
  language: string;
}

interface Startups {
  link: string;
  name: string;
  date: string;
  logo?: string;
}
const Home = () => {
  const projects: Projects[] = [
    {
      link: "https://medictranslate-enyata.vercel.app/",
      name: "Medic Translate",
      description:
        "An AI-powered tool for interpreting medical lab results. Built for Interswitch X Enyata Hackathon",
      language: "Typescript & Python",
    },
    {
      link: "https://scanzie.vercel.app",
      name: "Scanzie",
      description: "An seo web anaytics platform.",
      image: "/logos/scanzie.png",
      language: "Typescript",
    },
    {
      link: "https://loanparser.vercel.app",
      name: "Loan parser",
      description: "Scans loan documents with AI & parses them into JSON/CSV.",
      image: "/logos/loanparser.png",
      language: "GO & Typescript",
    },
    {
      link: "https://github.com/fisayo-dev/rssagg",
      name: "RSS Feed Aggregator",
      description: "A simple rss feed aggregators for blogs.",
      language: "GO",
    },
    {
      link: "https://raccvoting.vercel.app/",
      name: "Simple Node.js API",
      description:
        "As simple node.js API for an internship at Codveda Technologies.",
      language: "Node.js",
    },
    {
      link: "https://bookmark-hub-lilac.vercel.app/",
      name: "Bookmark Hub",
      description: "Store your bookmark links.",
      language: "Next.js",
    },
    {
      link: "https://raccvoting.vercel.app/",
      name: "Racc",
      description: "An internet voting space (JSM Hackathon).",
      image: "/logos/racc.png",
      language: "React.js",
    },

    {
      link: "https://github.com/fisayo-dev/shopping_app_api",
      name: "Shop app Api",
      description: "A basic Modern shopping app API",
      language: "Node.js",
    },
    {
      link: "https://searchjob.vercel.app/",
      name: "Joblier",
      description: "A job market community.",
      language: "React.js",
    },
    {
      link: "https://seekjob.vercel.app/",
      name: "Seekjob",
      description: "Job-seeking platform.",
      image: "/logos/seekjob.png",
      language: "React.js",
    },
  ];

  const startups: Startups[] = [
    {
      link: "https://thefullstackcreators.com",
      name: "The Full Stack Creators",
      date: "24th April, 2025 - Present",
      logo: "/logos/fsc.svg",
    },
    {
      link: "https://printeaze.com",
      name: "Printeaze - Campus printing",
      date: "21st March - 1st May, 2025",
      logo: "/logos/printeaze.png",
    },
    {
      link: "https://pickogen.online",
      name: "Pickogen - Design stock assets",
      date: "Nov - 19th Dec, 2025",
      logo: "/logos/pickogen.png",
    },
  ];
  return (
    <div className="grid gap-8 ">
      {/* Header: Greeting & Name Info: */}
      <div className="grid gap-3">
        <div
          className="h-32 w-32 sm:h-40 sm:w-40 md:h-50 md:w-50 2xl:h-64 2xl:w-64 rounded-full overflow-hidden"
          style={{
            backgroundImage: "url('/fisayobadina.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      {/* Whole body */}
      <div className="grid gap-3">
        {/* Intro */}
        <h1 className="text-sm font-bold">HELLO 👋</h1>
        <div className="grid gap-3 mb-4">
          <p className="">
            My name is Fisayo Obadina, I&apos;m a Software Engineer with 6+
            years of experience <b>in fullstack web development.</b> I have an
            intense passion for solving problems with code; I so much love to
            build projects 😁
            <br />
          </p>
          <p>
            I write most of my code in <b>JavaScript/Typescript</b> but, I am
            also exploring other languages like <b>Go</b>, <b>Rust</b> and{" "}
            <b>C++</b>.
          </p>
          <p>
            I have also participated in a couple hackathons and emerged as one
            of the winners of the <b>JSM mastery hackathon</b> in 2024.
          </p>
          <p>
            View my{" "}
            <Link
              className="font-bold hover:underline"
              href="https://github.com/fisayo-dev"
            >
              Github.
            </Link>
          </p>
        </div>
        <a href="/docs/resume.pdf" download>
          <button className=" border border-white/50 hover:border-white cursor-pointer  dark:hover:bg-white/20 mb-4 rounded-full p-4 max-w-48">
            Download resume
          </button>
        </a>
        {/* Projects */}
        <h1 className="text-sm font-bold">MY PROJECTS</h1>
        <div className="grid gap-3 mb-4">
          <div className="grid grid-cols-1  gap-3">
            {projects.map((project, index) => (
              <Link
                target="_blank"
                href={project.link}
                key={index}
                className="border border-white/10 hover:border-white/30 rounded-2xl overflow-hidden min-h-24 flex items-center gap-4 px-4 py-4"
              >
                <Image
                  src={`${project.image ?? "/file.svg"}`}
                  className="w-10 h-10 lg:w-14 lg:h-14"
                  alt={project.name}
                  height={58}
                  width={58}
                />
                <div className="flex flex-col items-start w-full">
                  <h2 className="lg:text-xl font-bold">{project.name}</h2>
                  <h2 className="text-sm 2xl:text-[1rem]">
                    {project.description.length > 100
                      ? `${project.description.slice(0, 17)}...`
                      : project.description}
                  </h2>
                </div>
                <span className="p-3 text-sm rounded-full bg-white/10 hover:bg-white/20">
                  {project.language}
                </span>
              </Link>
            ))}
          </div>
        </div>
        {/* Startups */}
        <h1 className="text-sm font-bold">STARTUPS</h1>
        <span>
          I have also worked together with teams to build startups. Some of them
          are:
        </span>
        <div className="grid gap-3 mb-4">
          <div className="grid grid-cols-1 gap-3">
            {startups.map((startup, index) => (
              <Link
                target="_blank"
                href={startup.link}
                key={index}
                className="border border-white/10 hover:border-white/30 rounded-2xl overflow-hidden min-h-24 flex items-center gap-4 px-4 py-4"
              >
                <Image
                  src={`${startup.logo ?? "/file.svg"}`}
                  alt={startup.name}
                  className="w-10 h-10 lg:w-14 lg:h-14"
                  height={58}
                  width={58}
                />
                <div className="flex flex-col items-start w-full">
                  <h2 className="lg:text-xl font-bold">{startup.name}</h2>
                  <h2 className="text-sm 2xl:text-[1rem]">{startup.date}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* Socials */}
        <h1 className="text-sm font-bold">SOCIALS</h1>
        <p>
          You can follow me on{" "}
          <Link
            className="font-bold hover:underline"
            target="_blank"
            href="https://github.com/fisayo-dev"
          >
            Github
          </Link>
          ,{" "}
          <Link
            className="font-bold hover:underline"
            target="_blank"
            href="https://linkedin.com/in/fisayobadina"
          >
            LinkedIn
          </Link>
          ,{" "}
          <Link
            className="font-bold hover:underline"
            target="_blank"
            href="https://x.com/fisaycoder"
          >
            X(Twitter)
          </Link>
          , {""}
          <Link
            className="font-bold hover:underline"
            target="_blank"
            href="https://instagram.com/fisayodev"
          >
            Instagram
          </Link>{" "}
          and {""}
          <Link
            className="font-bold hover:underline"
            target="_blank"
            href="https://web.facebook.com/olufisayo.obadina"
          >
            Facebook
          </Link>{" "}
          .
          <br />
          My Email is{" "}
          <Link
            className="hover:underline font-bold"
            href="mailto:olufisayobadina@gmail.com"
          >
            olufisayobadina@gmail.com
          </Link>{" "}
          & Whatsapp number:{" "}
          <Link href="#" className="hover:underline font-bold">
            +2340906978308.
          </Link>
          <br />
        </p>
        {/* Conclusion */}
        <i>Bye and keep building 👋</i>
      </div>
    </div>
  );
};

export default Home;
