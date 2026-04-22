'use client';

/* eslint-disable react/no-unescaped-entities */
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { memo, type ComponentType } from 'react';
import { TbDownload } from 'react-icons/tb';
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import { urlFor } from '../sanity';
import BackgroundCircles from './BackgroundCircles';

type Props = {
  pageInfo: PageInfo;
  skills: Skills[];
  // ParticlesCanvas injected from index.tsx as a dynamic import
  ParticlesCanvas: ComponentType<{ skills: Skills[] }>;
};

const Hero = ({ pageInfo, skills, ParticlesCanvas }: Props) => {
  const [text] = useTypewriter({
    words: [pageInfo.name ?? 'Phat Tran', 'Front-end Developer', 'ReactJS Developer'],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <div className="h-screen clip-home bg-light dark:bg-dark relative flex flex-col space-y-8 items-center justify-center text-center">
      {/* Decorative particle canvas — lazy loaded, hidden from a11y tree */}
      <ParticlesCanvas skills={skills} />
      <BackgroundCircles />

      {/* Avatar — LCP element, always eager-loaded with priority */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative rounded-full h-32 w-32 mx-auto overflow-hidden z-10 ring-2 ring-primary/30"
      >
      {pageInfo.avatarHero && (
        <Image
          src={urlFor(pageInfo.avatarHero).width(128).height(128).url()}
          alt={`${pageInfo.name ?? 'Phat Tran'} - Frontend Developer profile photo`}
          fill
          className="object-cover rounded-full"
          priority
          sizes="128px"
        />
      )}
      </motion.div>

      <div className="z-20">
        <motion.h2
          className="text-lg uppercase text-textlight dark:text-textdark tracking-[15px]"
          initial={{ y: -100, opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {pageInfo.role}
        </motion.h2>

        <h1 className="text-5xl lg:text-6xl font-semibold my-10">
          <span>I'm</span>{' '}
          <span className="mr-3 text-primary">{text}</span>
          <Cursor cursorColor="#6366f1" />
        </h1>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          {/* ✅ Next.js 13+ Link no longer needs a nested <a> tag */}
          <Link
            href="/CV_TranTanPhat_FrontendDev.pdf"
            download
            aria-label="Download CV as PDF"
            className="inline-flex items-center gap-2 bg-transparent font-medium px-5 py-2.5 rounded-md shadow-lg border border-primary text-primary hover:brightness-105 hover:bg-primary hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Download CV <TbDownload className="text-xl" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default memo(Hero);
