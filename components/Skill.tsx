'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { urlFor } from '../sanity';

type Props = {
  skill: Skills;
  index?: number;
};

const Skill = ({ skill, index = 0 }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 3D tilt on hover via mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]));
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const cardVariants = {
    initial: { x: 80, opacity: 0, scale: 0.85 },
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.07,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
    hover: {
      scale: 1.05,
      y: -8,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="group cursor-pointer"
      style={{ perspective: 1000 }}
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      viewport={{ once: true, margin: '-50px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      role="listitem"
      aria-label={skill.title}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-full h-full"
      >
        {/* Skill Card */}
        <div
          className="relative overflow-hidden w-full h-full p-6 flex flex-col items-center justify-center text-center rounded-2xl
          bg-gradient-to-br from-white/80 via-white/60 to-white/40
          dark:from-gray-900/80 dark:via-gray-800/60 dark:to-gray-700/40
          backdrop-blur-xl border border-white/20 dark:border-gray-600/30
          shadow-lg dark:shadow-2xl transition-all duration-500 ease-out
          min-h-[140px] sm:min-h-[160px] md:min-h-[180px]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Hover gradient */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            aria-hidden="true"
          />

          {/* Floating particles — only when hovered */}
          {isHovered && (
            <div aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary/40 rounded-full"
                  initial={{ x: (i - 1) * 30, y: (i - 1) * 20, opacity: 0 }}
                  animate={{ x: (i - 1) * 70, y: (i - 1) * 50, opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                />
              ))}
            </div>
          )}

          {/* Skill Icon */}
          <motion.div className="relative z-10 mb-4" style={{ transformStyle: 'preserve-3d' }}>
            <div
              className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
              style={{ transform: 'translateZ(20px)' }}
            >
              <Image
                src={urlFor(skill.image).width(80).height(80).url()}
                alt="" // empty — parent role=listitem with aria-label covers this
                fill
                className="object-contain transition-all duration-300 filter group-hover:brightness-110"
                loading="lazy"
                sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, 80px"
              />
            </div>

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl opacity-0 group-hover:opacity-60"
              animate={isHovered ? { scale: [1, 1.2, 1], opacity: [0, 0.6, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              aria-hidden="true"
            />
          </motion.div>

          {/* Skill Title */}
          <div className="relative z-10" style={{ transformStyle: 'preserve-3d' }}>
            <p
              className="text-sm sm:text-base md:text-lg font-semibold
              text-textlight dark:text-textdark
              group-hover:text-primary dark:group-hover:text-white
              transition-colors duration-300"
              style={{ transform: 'translateZ(10px)' }}
            >
              {skill.title}
            </p>
            {/* Underline accent */}
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
              aria-hidden="true"
            />
          </div>

          {/* Corner accent */}
          <div
            className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ clipPath: 'polygon(0 100%, 100% 100%, 0 0)' }}
            aria-hidden="true"
          />
        </div>

        {/* Shadow layer */}
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
          style={{ transform: 'translateZ(-10px) scale(1.1)', filter: 'blur(20px)' }}
          aria-hidden="true"
        />
      </motion.div>
    </motion.div>
  );
};

export default Skill;
