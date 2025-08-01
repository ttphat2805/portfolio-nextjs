/* eslint-disable @next/next/no-img-element */
import { motion, useScroll, useTransform } from "framer-motion";
import { AiOutlineGithub, AiOutlineEye } from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { urlFor } from "../sanity";
import Link from "next/link";
import { formatDate } from "../shared/contants";
import { memo, useRef } from "react";

type Props = {
  project: Project[];
};

const Projects = ({ project }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const headerY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const projectVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-20 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="sm:h-[700px] h-[500px] "></div>
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-0 w-full h-96 bg-gradient-to-r from-primary/10 via-primary/20 to-transparent -skew-y-12 transform" />
        <div className="absolute top-1/2 right-0 w-3/4 h-64 bg-gradient-to-l from-secondary/10 via-secondary/20 to-transparent skew-y-6 transform" />
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        {/* Enhanced Header */}
        <motion.div style={{ y: headerY }} className="text-center mb-20">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="inline-block mb-6"
          >
            <span className="text-6xl">🚀</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl tracking-[20px] uppercase md:text-6xl lg:text-7xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary mb-10"
          >
            Projects
          </motion.h2>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16 md:space-y-24"
        >
          {project.map((item: Project, index: number) => (
            <motion.article
              key={index}
              variants={projectVariants}
              className="group max-w-7xl mx-auto"
            >
              <div
                className={`
                grid grid-cols-1 lg:grid-cols-2 gap-8 items-center
                ${index % 2 === 1 ? "lg:grid-cols-2" : "lg:grid-cols-2"}
              `}
              >
                {/* Project Image */}
                <motion.div
                  className={`
                    relative overflow-hidden rounded-2xl shadow-2xl
                    ${index % 2 === 1 ? "lg:order-2" : "lg:order-1"}
                  `}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="aspect-video relative">
                    <img
                      src={urlFor(item.image).url()}
                      alt={`${item.title} preview`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Quick Actions Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex gap-4">
                        {item.linkBuild && (
                          <motion.a
                            href={item.linkBuild}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all"
                          >
                            <AiOutlineGithub className="w-6 h-6 text-gray-800" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Project Info */}
                <div
                  className={`
                  space-y-6
                  ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}
                `}
                >
                  {/* Project Number */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center gap-4"
                  >
                    <span className="text-6xl font-bold text-primary/20">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="h-px bg-gradient-to-r from-primary to-transparent flex-1" />
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary"
                  >
                    {item.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="space-y-3"
                  >
                    {item.summary.length > 0 &&
                      item.summary.map((text: SanityBlock, index: number) => {
                        if (text._type !== "block" || !text.children) {
                          return null;
                        }
                        return (
                          <p
                            key={index}
                            className="text-textlight dark:text-textdark text-lg leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: text.children[0].text,
                            }}
                          />
                        );
                      })}
                  </motion.div>

                  {/* Date Range */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex items-center gap-2 text-textlight dark:text-textdark/80"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    <span className="font-medium">
                      {`${formatDate(item.fromDate)} - ${
                        formatDate(item.toDate)
                          ? formatDate(item.toDate)
                          : "Present"
                      }`}
                    </span>
                  </motion.div>

                  {/* Technologies */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="space-y-4"
                  >
                    <h4 className="text-lg font-semibold text-textlight dark:text-textdark">
                      Built with
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {item.technologies.map(
                        (tech: Technology, techIndex: number) => (
                          <motion.div
                            key={techIndex}
                            whileHover={{
                              scale: 1.1,
                              rotate: [0, -5, 5, 0],
                              transition: { duration: 0.3 },
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="relative group/tech"
                          >
                            <div className="p-3 bg-light/80 dark:bg-dark/80 rounded-xl shadow-lg backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all">
                              <img
                                src={urlFor(tech.image).url()}
                                alt={`${tech.title || "Technology"} icon`}
                                className="w-8 h-8 object-contain"
                              />
                            </div>

                            {/* Tooltip */}
                            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-dark text-white text-xs rounded opacity-0 group-hover/tech:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                              {tech.title || "Technology"}
                            </div>
                          </motion.div>
                        )
                      )}
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
