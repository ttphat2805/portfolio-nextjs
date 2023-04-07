import { motion } from "framer-motion";
import { GetServerSideProps } from "next";
import { useEffect, useRef, useState } from "react";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import {
  getPageInfo,
  getProjects,
  getSkills,
  getSocials,
} from "../services/http";

type Props = {
  pageInfo: PageInfo;
  skills: Skills[];
  projects: Project[];
  socials: Socials[];
};

export default function Home({ pageInfo, skills, projects, socials }: Props) {
  const containerRef = useRef(null);
  const [theme, setTheme] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
  };

  useEffect(() => {
    const element = document!.documentElement;
    if (theme) {
      element.classList.remove("dark");
    } else {
      element.classList.add("dark");
    }
  }, [theme]);

  return (
    <div className="dark:bg-bgmain bg-white/80 dark:text-white z-0 overflow-x-hidden scroll-smooth">
      <motion.div
        className="w-[32px] h-[32px] border border-gray-400 dark:border-white rounded-full fixed top-0 left-0 pointer-events-none z-[100]"
        variants={variants}
        animate={"default"}
        transition={{ duration: 0.07 }}
      />
      <LocomotiveScrollProvider
        options={{
          smooth: true,
          smartPhone: {
            smooth: true,
          },
          tablet: {
            smooth: true,
          },
        }}
        watch={[]}
        containerRef={containerRef}
      >
        <main data-scroll-container ref={containerRef}>
          {/* HEADER */}
          <Header socials={socials} theme={theme} setTheme={setTheme} />
          {/* HERO */}
          <section id="hero" data-scroll>
            <Hero pageInfo={pageInfo} skills={skills} />
          </section>
          {/* ABOUT */}
          <section id="about" data-scroll>
            <About pageInfo={pageInfo} />
          </section>
          {/* SKILLS */}
          <section id="skills" data-scroll>
            <Skills skills={skills} />
          </section>
          {/* PROJECTS */}
          <section id="projects" data-scroll>
            <Projects project={projects} />
          </section>
          {/* CONTACT */}
          <section id="contact" data-scroll>
            <Contact theme={theme} />
          </section>
          {/* FOOTER */}
          <section id="footer" data-scroll>
            <Footer />
          </section>
        </main>
      </LocomotiveScrollProvider>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const pageInfo: PageInfo = await getPageInfo();
  const projects: Project[] = await getProjects();
  const skills: Skills[] = await getSkills();
  const socials: Socials[] = await getSocials();

  return {
    props: {
      pageInfo,
      projects,
      skills,
      socials,
    },
  };
};
