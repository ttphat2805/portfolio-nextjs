'use client';

/* eslint-disable react/no-unescaped-entities */
import { m } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { memo, type ComponentType } from 'react';
import { TbDownload } from 'react-icons/tb';
import { HiOutlineChevronDown, HiOutlineArrowRight } from 'react-icons/hi';
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import { urlFor } from '../sanity';
import { fadeInUp, staggerContainer } from '../shared/motionVariants';

type Props = {
  pageInfo: PageInfo;
  skills: Skills[];
  // ParticlesCanvas injected from index.tsx as a dynamic import
  ParticlesCanvas: ComponentType<{ skills: Skills[] }>;
};

const Hero = ({ pageInfo, skills, ParticlesCanvas }: Props) => {
  const typewriterWords =
    pageInfo.heroTypewriterWords?.length
      ? pageInfo.heroTypewriterWords
      : [pageInfo.name ?? 'Phat Tran', 'Front-end Developer', 'ReactJS Developer'];

  const [text] = useTypewriter({
    words: typewriterWords,
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <div className="h-screen clip-home bg-light dark:bg-dark relative flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Aurora backdrop — blurred gradient blobs, compositor-only drift */}
      <div className="hero-aurora" aria-hidden="true">
        <span className="hero-aurora__blob hero-aurora__blob--1" />
        <span className="hero-aurora__blob hero-aurora__blob--2" />
        <span className="hero-aurora__blob hero-aurora__blob--3" />
      </div>

      {/* Decorative particle canvas — lazy loaded, hidden from a11y tree */}
      <ParticlesCanvas skills={skills} />

      <m.div
        variants={staggerContainer(0.12, 0.15)}
        initial="hidden"
        animate="visible"
        className="relative z-20 flex flex-col items-center space-y-7 px-4"
      >
        {/* Availability badge */}
        <m.div
          variants={fadeInUp}
          className="liquid-glass inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-sm font-medium
            text-textlight dark:text-textdark"
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          {pageInfo.heroBadgeText || 'Open to new opportunities'}
        </m.div>

        {/* Avatar — LCP element, eager-loaded; rotating gradient ring */}
        <m.div variants={fadeInUp} className="relative h-36 w-36">
          <span
            className="absolute -inset-1 rounded-full animate-spin-slow blur-[3px] opacity-80
              bg-[conic-gradient(from_0deg,#6366f1,#8b5cf6,#22d3ee,#6366f1)]"
            aria-hidden="true"
          />
          <span
            className="absolute -inset-[3px] rounded-full animate-spin-slow
              bg-[conic-gradient(from_0deg,#6366f1,#8b5cf6,#22d3ee,#6366f1)]"
            aria-hidden="true"
          />
          <div className="relative h-full w-full rounded-full overflow-hidden ring-4 ring-light dark:ring-dark">
            {pageInfo.avatarHero && (
              <Image
                src={urlFor(pageInfo.avatarHero).width(288).height(288).url()}
                alt={`${pageInfo.name ?? 'Phat Tran'} - Frontend Developer profile photo`}
                fill
                className="object-cover rounded-full"
                priority
                sizes="144px"
              />
            )}
          </div>
        </m.div>

        {/* Role — <p>, not <h2>: keeps the h1 first in the heading outline */}
        <m.p
          variants={fadeInUp}
          className="text-sm md:text-base uppercase text-textlight dark:text-textdark tracking-[6px] md:tracking-[12px]"
        >
          {pageInfo.role}
        </m.p>

        <m.h1
          variants={fadeInUp}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
        >
          <span>I'm</span>{' '}
          <span className="mr-3 text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-cyan-400">
            {text}
          </span>
          <Cursor cursorColor="#6366f1" />
        </m.h1>

        {/* CTA row */}
        <m.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <m.a
            href="#projects"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 font-semibold px-7 py-3 rounded-full text-white
              bg-gradient-to-r from-primary to-secondary
              shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40
              transition-shadow duration-300
              focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            View Projects <HiOutlineArrowRight aria-hidden="true" />
          </m.a>

          <m.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
            <Link
              href={pageInfo.heroResumeUrl?.asset?.url || '/CV_TranTanPhat_FrontendDev.pdf'}
              download
              aria-label="Download Resume as PDF"
              className="inline-flex items-center gap-2 font-medium px-7 py-3 rounded-full
                border border-primary/40 text-primary
                bg-white/60 dark:bg-white/5 backdrop-blur-md
                hover:bg-primary hover:text-white hover:border-primary
                transition-colors duration-300
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Download Resume <TbDownload className="text-xl" aria-hidden="true" />
            </Link>
          </m.div>
        </m.div>
      </m.div>

      {/* Scroll cue — pure CSS bounce */}
      <m.a
        href="#about"
        aria-label="Scroll to the About section"
        className="absolute bottom-[15%] z-20 text-textlight dark:text-textdark/80 hover:text-primary dark:hover:text-primary transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <HiOutlineChevronDown className="w-7 h-7 animate-bounce" aria-hidden="true" />
      </m.a>
    </div>
  );
};

export default memo(Hero);
