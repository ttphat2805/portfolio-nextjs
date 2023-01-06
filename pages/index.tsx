import Head from "next/head";
import { useState, useEffect } from "react";
import About from "../components/About";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { motion } from "framer-motion";
import Skills from "../components/Skills";
import Projects from "../components/Projects";

export default function Home() {
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
    <div className="bg-[rgb(36,36,36)] text-white h-screen snap-y snap-mandatory overflow-y-scroll z-0">
      <Head>
        <title>Learn NextJS</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <motion.div
        className="w-[32px] h-[32px] border border-white rounded-full fixed top-0 left-0 pointer-events-none z-[100]"
        variants={variants}
        animate={"default"}
        transition={{ duration: 0.07 }}
      />
      <main className="">
        {/* HEADER */}
        <Header />

        {/* HERO */}
        <section id="hero" className="snap-center">
          <Hero />
        </section>

        {/* ABOUT */}
        <section id="about" className="snap-center">
          <About />
        </section>
        {/* SKILLS */}
        <section id="skills" className="snap-start">
          <Skills />
        </section>
        {/* PROJECTS */}
        <section id="projects" className="snap-start">
          <Projects />
        </section>
        {/* CONTACT */}
      </main>
    </div>
  );
}
