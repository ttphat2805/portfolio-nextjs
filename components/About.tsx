'use client';

import { PortableText } from '@portabletext/react';
import { m } from 'framer-motion';
import Image from 'next/image';
import { memo } from 'react';
import { urlFor } from '../sanity';
import { fadeInUp, staggerContainer } from '../shared/motionVariants';
import SectionHeading from './SectionHeading';

type Props = {
  pageInfo: PageInfo;
};

const About = ({ pageInfo }: Props) => {
  return (
    <div className="relative min-h-screen max-w-7xl mx-auto px-6 md:px-10 py-24 flex flex-col justify-center overflow-hidden">
      {/* Ambient gradient blob behind the section */}
      <div
        className="absolute top-1/3 -left-40 w-[420px] h-[420px] rounded-full bg-primary/15 dark:bg-primary/10 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <SectionHeading id="about-heading" eyebrow="Who I am" title="About" />

      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] items-center gap-10 lg:gap-16">
        {/* Photo — gradient glow frame */}
        <m.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-80px' }}
          className="relative mx-auto"
        >
          {/* Gradient border frame */}
          <div className="relative p-[2px] rounded-[2rem]">
            <div className="relative w-64 h-64 md:w-72 md:h-96 xl:w-[420px] xl:h-[480px] rounded-[calc(2rem-2px)] overflow-hidden bg-light dark:bg-dark">
              {pageInfo.backgroundAvatar && (
                <Image
                  src={urlFor(pageInfo.backgroundAvatar).width(550).height(650).url()}
                  alt={`${pageInfo.name ?? 'Phat Tran'} profile photo`}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                  sizes="(max-width: 768px) 256px, (max-width: 1280px) 288px, 420px"
                />
              )}
            </div>
          </div>
        </m.div>

        {/* Bio — glass panel with staggered paragraphs */}
        <m.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="relative rounded-3xl p-8 md:p-10 text-left
            bg-white/60 dark:bg-white/5 backdrop-blur-md
            border border-gray-200/70 dark:border-white/10 shadow-xl shadow-primary/5"
        >
          <m.h3
            variants={fadeInUp}
            className="text-2xl md:text-3xl font-semibold tracking-tight mb-6 text-textlight dark:text-white"
          >
            Briefly{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              about
            </span>{' '}
            yourself
          </m.h3>

          <PortableText
            value={pageInfo?.summary}
            components={{
              block: {
                normal: ({ children }) => (
                  <m.p
                    variants={fadeInUp}
                    className="text-textlight dark:text-textdark max-w-3xl break-words leading-relaxed mb-4 text-base first:text-lg first:md:text-xl"
                  >
                    {children}
                  </m.p>
                ),
              },
            }}
          />

          {/* Accent underline */}
          <m.div
            variants={fadeInUp}
            className="mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-secondary"
            aria-hidden="true"
          />
        </m.div>
      </div>
    </div>
  );
};

export default memo(About);
