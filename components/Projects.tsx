'use client';

import { PortableText } from '@portabletext/react';
import { m, useScroll, useTransform, type Variants } from 'framer-motion';
import Image from 'next/image';
import { memo, useRef } from 'react';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { urlFor } from '../sanity';
import { formatDate } from '../shared/contants';
import SectionHeading from './SectionHeading';

type Props = {
  project: Project[];
};

const projectVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const Projects = ({ project }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={containerRef} className="relative min-h-screen py-28 overflow-hidden">
      {/* Parallax background */}
      <m.div style={{ y: backgroundY }} className="absolute inset-0 z-0 will-change-transform" aria-hidden="true">
        <div className="absolute top-1/4 left-0 w-full h-96 bg-gradient-to-r from-primary/10 via-primary/20 to-transparent -skew-y-12 transform" />
        <div className="absolute top-1/2 right-0 w-3/4 h-64 bg-gradient-to-l from-secondary/10 via-secondary/20 to-transparent skew-y-6 transform" />
      </m.div>

      {/* Floating accent dots — pure CSS keyframes, no JS animation loop */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {[5, 22, 40, 58, 75, 90].map((left, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${left}%`,
              top: `${(i * 17 + 10) % 90}%`,
              animationDuration: `${3 + i * 0.5}s`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <SectionHeading id="projects-heading" eyebrow="Selected work" title="Projects" />

        {/* Project cards */}
        <div className="space-y-14 md:space-y-20">
          {project.map((item: Project, index: number) => (
            <m.article
              key={item._id ?? index}
              variants={projectVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="group relative max-w-7xl mx-auto rounded-3xl p-6 md:p-10
                bg-white/60 dark:bg-white/5 backdrop-blur-md
                border border-gray-200/70 dark:border-white/10
                shadow-xl shadow-primary/5
                transition-all duration-500 hover:shadow-2xl hover:shadow-primary/15 hover:border-primary/30"
            >
              {/* Gradient top edge accent */}
              <div
                className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Project image — whole preview is clickable when a live link exists */}
                <m.a
                  href={item.linkBuild || undefined}
                  target={item.linkBuild ? '_blank' : undefined}
                  rel={item.linkBuild ? 'noopener noreferrer' : undefined}
                  aria-label={item.linkBuild ? `Open ${item.title} live site` : undefined}
                  whileHover={item.linkBuild ? { scale: 1.015 } : undefined}
                  className={`relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-gray-200/60 dark:ring-white/10 block
                    ${item.linkBuild ? 'cursor-pointer' : 'pointer-events-none'}
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                    ${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}
                >
                  <div className="aspect-video relative">
                    <Image
                      src={urlFor(item.image).width(800).height(450).url()}
                      alt={`${item.title} project preview screenshot`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />

                    {item.linkBuild && (
                      <>
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          aria-hidden="true"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <span
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white
                              bg-gradient-to-r from-primary to-secondary shadow-lg"
                          >
                            View Live Site <HiOutlineExternalLink aria-hidden="true" />
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </m.a>

                {/* Project info — left-aligned throughout; centering multi-line body text hurts readability */}
                <div className={`space-y-5 text-left ${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="flex items-center justify-start gap-4" aria-hidden="true">
                    <span className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary/40 to-secondary/20">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="h-px bg-gradient-to-r from-primary to-transparent flex-1" />
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-textlight dark:text-white">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-start gap-2 text-sm text-textlight/80 dark:text-textdark/70">
                    <span className="w-2 h-2 bg-primary rounded-full" aria-hidden="true" />
                    <time>
                      {`${formatDate(item.fromDate)} – ${
                        item.toDate ? formatDate(item.toDate) : 'Present'
                      }`}
                    </time>
                  </div>

                  <div className="space-y-3">
                    <PortableText
                      value={item.summary}
                      components={{
                        block: {
                          normal: ({ children }) => (
                            <p className="text-textlight dark:text-textdark leading-relaxed">
                              {children}
                            </p>
                          ),
                        },
                      }}
                    />
                  </div>

                  {/* Tech chips — names visible (tooltips were unusable on touch) */}
                  <ul
                    className="flex flex-wrap justify-start gap-2 list-none p-0 pt-1"
                    aria-label="Technologies used"
                  >
                    {item.technologies.map((tech: Technology, techIdx: number) => (
                      <li
                        key={tech._id ?? techIdx}
                        className="liquid-glass liquid-glass-lift inline-flex items-center gap-2 pl-2.5 pr-3.5 py-1.5 rounded-full text-sm font-medium
                          text-textlight dark:text-textdark cursor-default"
                      >
                        <span className="relative w-5 h-5">
                          <Image
                            src={urlFor(tech.image).width(40).fit('max').url()}
                            alt=""
                            fill
                            className="object-contain"
                            loading="lazy"
                            sizes="20px"
                          />
                        </span>
                        {tech.title ?? 'Technology'}
                      </li>
                    ))}
                  </ul>

                  {/* Live link */}
                  {item.linkBuild && (
                    <m.a
                      href={item.linkBuild}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white
                        bg-gradient-to-r from-primary to-secondary
                        shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35
                        transition-shadow duration-300
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      View project <HiOutlineExternalLink aria-hidden="true" />
                    </m.a>
                  )}
                </div>
              </div>
            </m.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Projects);
