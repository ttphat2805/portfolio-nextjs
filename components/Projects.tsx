'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useRef } from 'react';
import { AiOutlineGithub } from 'react-icons/ai';
import { urlFor } from '../sanity';
import { formatDate } from '../shared/contants';

type Props = {
  project: Project[];
};

const Projects = ({ project }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const headerY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.2 },
    },
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-20 overflow-hidden"
      aria-labelledby="projects-heading"
    >
      {/* Spacer for clip-path offset from hero */}
      <div className="h-[700px] sm:h-[400px]" aria-hidden="true" />

      {/* Parallax background */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-1/4 left-0 w-full h-96 bg-gradient-to-r from-primary/10 via-primary/20 to-transparent -skew-y-12 transform" />
        <div className="absolute top-1/2 right-0 w-3/4 h-64 bg-gradient-to-l from-secondary/10 via-secondary/20 to-transparent skew-y-6 transform" />
      </motion.div>

      {/* Floating accent dots — deterministic positions (no Math.random) */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {[5, 22, 40, 58, 75, 90].map((left, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{ left: `${left}%`, top: `${(i * 17 + 10) % 90}%` }}
            animate={{ y: [-20, 20, -20], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        {/* Section header */}
        <motion.div style={{ y: headerY }} className="text-center mb-20">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: 'backOut' }}
            viewport={{ once: true }}
            className="inline-block mb-6"
            aria-hidden="true"
          >
            <span className="text-6xl">🚀</span>
          </motion.div>

          <motion.h2
            id="projects-heading"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl tracking-[20px] uppercase md:text-6xl lg:text-7xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary mb-10"
          >
            Projects
          </motion.h2>
        </motion.div>

        {/* Projects list */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-16 md:space-y-24"
        >
          {project.map((item: Project, index: number) => (
            <motion.article
              key={item._id ?? index}
              variants={projectVariants}
              className="group max-w-7xl mx-auto"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Project image */}
                <motion.div
                  className={`relative overflow-hidden rounded-2xl shadow-2xl ${
                    index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />

                    {/* Quick action overlay */}
                    {item.linkBuild && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <motion.a
                          href={item.linkBuild}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                          aria-label={`View ${item.title} source code on GitHub`}
                        >
                          <AiOutlineGithub className="w-6 h-6 text-gray-800" aria-hidden="true" />
                        </motion.a>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Project info */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                    aria-hidden="true"
                  >
                    <span className="text-6xl font-bold text-primary/20">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="h-px bg-gradient-to-r from-primary to-transparent flex-1" />
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary"
                  >
                    {item.title}
                  </motion.h3>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="space-y-3"
                  >
                    {item.summary.map((text: SanityBlock, sIdx: number) => {
                      if (text._type !== 'block' || !text.children) return null;
                      return (
                        <p
                          key={sIdx}
                          className="text-textlight dark:text-textdark text-lg leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: text.children[0].text }}
                        />
                      );
                    })}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 text-textlight dark:text-textdark/80"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full" aria-hidden="true" />
                    <time>
                      {`${formatDate(item.fromDate)} – ${
                        item.toDate ? formatDate(item.toDate) : 'Present'
                      }`}
                    </time>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="space-y-4"
                  >
                    <h4 className="text-lg font-semibold text-textlight dark:text-textdark">
                      Built with
                    </h4>
                    <div className="flex flex-wrap gap-3" role="list" aria-label="Technologies used">
                      {item.technologies.map((tech: Technology, techIdx: number) => (
                        <motion.div
                          key={tech._id ?? techIdx}
                          role="listitem"
                          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] as unknown as number }}
                          whileTap={{ scale: 0.95 }}
                          className="relative group/tech"
                        >
                          <div className="p-3 bg-light/80 dark:bg-dark/80 rounded-xl shadow-lg backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all">
                            <div className="relative w-8 h-8">
                              <Image
                                src={urlFor(tech.image).width(64).height(64).url()}
                                alt={tech.title ?? 'Technology'}
                                fill
                                className="object-contain"
                                loading="lazy"
                                sizes="32px"
                              />
                            </div>
                          </div>
                          {/* Tooltip */}
                          <div
                            className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-dark text-white text-xs rounded opacity-0 group-hover/tech:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
                            role="tooltip"
                          >
                            {tech.title ?? 'Technology'}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Projects);
