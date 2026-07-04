'use client';

import type { GetStaticProps } from 'next';
import { m, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import { groq } from 'next-sanity';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import ScrollProgress from '../components/ScrollProgress';
import Skills from '../components/Skills';
import useTheme from '../hooks/useTheme';
import { sanityClient } from '../sanity';

import ParticlesCanvas from '../components/ParticlesCanvas';

type Props = {
  pageInfo: PageInfo;
  skills: Skills[];
  projects: Project[];
  socials: Socials[];
};

export default function Home({ pageInfo, skills, projects, socials }: Props) {
  const { theme, toggleTheme } = useTheme();

  // Custom cursor via motion values — avoids a setState re-render per mousemove
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 600, damping: 40, mass: 0.4 });
  const springY = useSpring(cursorY, { stiffness: 600, damping: 40, mass: 0.4 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [cursorX, cursorY]);

  return (
    <div className="dark:bg-bgmain bg-white/80 dark:text-white overflow-x-hidden">
      <ScrollProgress />

      {/* Custom cursor — desktop only */}
      <m.div
        className="w-8 h-8 border border-gray-400 dark:border-white rounded-full fixed top-0 left-0 pointer-events-none z-[100] hidden md:block will-change-transform"
        style={{ x: springX, y: springY }}
        aria-hidden="true"
      />

      <Header socials={socials} theme={theme} toggleTheme={toggleTheme} />

      <main id="main-content">
        <section id="hero" aria-label="Introduction">
          <Hero pageInfo={pageInfo} skills={skills} ParticlesCanvas={ParticlesCanvas} />
        </section>

        <section id="about" aria-labelledby="about-heading">
          <About pageInfo={pageInfo} />
        </section>

        <section id="skills" aria-labelledby="skills-heading">
          <Skills skills={skills} />
        </section>

        <section id="projects" aria-labelledby="projects-heading">
          <Projects project={projects} />
        </section>

        <section id="contact" aria-labelledby="contact-heading">
          <Contact pageInfo={pageInfo} />
        </section>
      </main>

      <Footer socials={socials} />
    </div>
  );
}

// GROQ queries — same shape as the API routes, run at build time instead
const pageInfoQuery = groq`*[_type=="pageInfo"][0] {
  ...,
  socials[]->,
  heroResumeUrl { asset-> { url } }
}`;

const projectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    ...,
    technologies[]->
  }
`;

const skillsQuery = groq`*[_type=="skill"]`;

const socialsQuery = groq`*[_type=="socials"]`;

const emptyPageInfo = (): PageInfo =>
  ({
    _id: '',
    _createAt: '',
    _rev: '',
    _updatedAt: '',
    _type: 'pageInfo',
    address: '',
    avatarHero: undefined as unknown as Image,
    backgroundAvatar: undefined as unknown as Image,
    email: '',
    name: '',
    phoneNumber: '',
    role: '',
    heroTypewriterWords: [],
    heroBadgeText: '',
    socials: [],
    summary: [],
    titleAbout: '',
  }) as PageInfo;

// ISR: builds statically, then regenerates in the background every 60s
export const getStaticProps: GetStaticProps<Props> = async () => {
  // No projectId means CI without env vars — skip the Sanity fetch
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return {
      props: { pageInfo: emptyPageInfo(), projects: [], skills: [], socials: [] },
      revalidate: 60,
    };
  }

  try {
    const [pageInfo, projects, skills, socials] = await Promise.all([
      sanityClient.fetch<PageInfo>(pageInfoQuery),
      sanityClient.fetch<Project[]>(projectsQuery),
      sanityClient.fetch<Skills[]>(skillsQuery),
      sanityClient.fetch<Socials[]>(socialsQuery),
    ]);

    return {
      props: { pageInfo, projects, skills, socials },
      revalidate: 60, // ISR: background-regenerate every 60s
    };
  } catch (error) {
    console.error('[getStaticProps] Sanity fetch failed:', error);
    return {
      props: { pageInfo: emptyPageInfo(), projects: [], skills: [], socials: [] },
      revalidate: 30,
    };
  }
};
