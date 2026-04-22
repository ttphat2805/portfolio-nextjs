'use client';

import type { GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { groq } from 'next-sanity';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import { sanityClient } from '../sanity';

import ParticlesCanvas from '../components/ParticlesCanvas';

type Props = {
  pageInfo: PageInfo;
  skills: Skills[];
  projects: Project[];
  socials: Socials[];
};

export default function Home({ pageInfo, skills, projects, socials }: Props) {
  const [theme, setTheme] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // 🚀 Throttle mousemove via rAF — prevents 200+ re-renders/sec
  const rafRef = useRef<number>(0);
  const mouseMove = useCallback((e: MouseEvent) => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', mouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', mouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [mouseMove]);

  // Dark mode — sync CSS class on <html>
  useEffect(() => {
    const el = document.documentElement;
    if (theme) {
      el.classList.remove('dark');
    } else {
      el.classList.add('dark');
    }
  }, [theme]);

  return (
    <div className="dark:bg-bgmain bg-white/80 dark:text-white overflow-x-hidden scroll-smooth">
      {/* Custom cursor — desktop only */}
      <motion.div
        className="w-8 h-8 border border-gray-400 dark:border-white rounded-full fixed top-0 left-0 pointer-events-none z-[100] hidden md:block"
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
        transition={{ duration: 0.07, type: 'tween' }}
        aria-hidden="true"
      />

      <main id="main-content">
        <Header socials={socials} theme={theme} setTheme={setTheme} />

        <section id="hero" aria-label="Hero section">
          <Hero pageInfo={pageInfo} skills={skills} ParticlesCanvas={ParticlesCanvas} />
        </section>

        <section id="about" aria-label="About section">
          <About pageInfo={pageInfo} />
        </section>

        <section id="skills" aria-label="Skills section">
          <Skills skills={skills} />
        </section>

        <section id="projects" aria-label="Projects section">
          <Projects project={projects} />
        </section>

        <section id="contact" aria-label="Contact section">
          <Contact theme={theme} />
        </section>

        <footer id="footer">
          <Footer />
        </footer>
      </main>
    </div>
  );
}

// =========================================================
// GROQ queries (same as API routes, but run at build time
// directly against Sanity — no HTTP round-trip, no server needed)
// =========================================================

const pageInfoQuery = groq`*[_type=="pageInfo"][0] {
  ...,
  socials[]->
}`;

const projectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    ...,
    technologies[]->
  }
`;

const skillsQuery = groq`*[_type=="skill"]`;

const socialsQuery = groq`*[_type=="socials"]`;

// =========================================================
// getStaticProps + ISR
// =========================================================
// Before: getServerSideProps → 4 serial HTTP calls → 3–5s TTFB per visitor
// After:  getStaticProps → 4 parallel Sanity queries at build time
//         → pre-built HTML served from CDN → ~50ms TTFB
// =========================================================
export const getStaticProps: GetStaticProps<Props> = async () => {
  // Skip Sanity fetch if projectId not configured (CI without env vars)
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return {
      props: {
        pageInfo: {
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
          socials: [],
          summary: [],
          titleAbout: '',
        } as PageInfo,
        projects: [],
        skills: [],
        socials: [],
      },
      revalidate: 60,
    };
  }

  try {
    // ✅ All 4 queries in parallel — no serial waiting
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
      props: {
        pageInfo: {
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
          socials: [],
          summary: [],
          titleAbout: '',
        } as PageInfo,
        projects: [],
        skills: [],
        socials: [],
      },
      revalidate: 30,
    };
  }
};
