import { useState, useEffect, useRef } from "react";
import About from "../components/About";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { motion } from "framer-motion";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import Footer from "../components/Footer";
import { GetStaticProps } from "next";
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

  return (
    <div className="bg-bgmain text-white z-0 overflow-x-hidden scroll-smooth">
      <motion.div
        className="w-[32px] h-[32px] border border-white rounded-full fixed top-0 left-0 pointer-events-none z-[100]"
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
          <Header socials={socials} />
          {/* HERO */}
          <section id="hero" data-scroll>
            <Hero pageInfo={pageInfo} />
          </section>
          {/* ABOUT */}
          <section id="about" data-scroll>
            <About pageInfo={pageInfo} />
          </section>
          {/* SKILLS */}
          <section id="skills" data-scroll>
            <Skills />
          </section>
          {/* PROJECTS */}
          <section id="projects" data-scroll>
            <Projects />
          </section>
          {/* CONTACT */}
          <section id="contact">
            <Contact />
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

export const getStaticProps: GetStaticProps<Props> = async () => {
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
    revalidate: 10,
  };
};
