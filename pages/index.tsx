import { useState, useEffect, useRef } from "react";
import About from "../components/About";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { motion } from "framer-motion";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
export default function Home() {
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
    <LocomotiveScrollProvider
      options={{
        smooth: true,
      }}
      watch={[]}
      containerRef={containerRef}
    >
      <div className="bg-[rgb(36,36,36)] text-white z-0 overflow-x-hidden scroll-smooth">
        {/* <motion.div
          className="w-[32px] h-[32px] border border-white rounded-full fixed top-0 left-0 pointer-events-none z-[100]"
          variants={variants}
          animate={"default"}
          transition={{ duration: 0.07 }}
        /> */}
        <main data-scroll-container ref={containerRef}>
          {/* HEADER */}
          <Header />
          {/* HERO */}
          <section id="hero" data-scroll>
            <Hero />
          </section>
          {/* ABOUT */}
          <section id="about" data-scroll>
            <About />
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
          <section id="contact" data-scroll>
            <Contact />
          </section>
        </main>
      </div>
    </LocomotiveScrollProvider>
  );
}
