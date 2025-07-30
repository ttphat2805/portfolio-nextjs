/* eslint-disable @next/next/no-img-element */
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { urlFor } from "../sanity";
import { useState, useRef } from "react";

type Props = {
  skill: Skills;
  index?: number;
};

const Skill = ({ skill, index = 0 }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]));
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseXPercent = (e.clientX - rect.left - width / 2) / width;
    const mouseYPercent = (e.clientY - rect.top - height / 2) / height;

    mouseX.set(mouseXPercent);
    mouseY.set(mouseYPercent);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const cardVariants = {
    initial: {
      x: 100,
      opacity: 0,
      scale: 0.8,
      rotateY: 25,
    },
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    hover: {
      scale: 1.05,
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.1 + 0.3,
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
    hover: {
      scale: 1.2,
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 300,
      },
    },
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1 + 0.5,
      },
    },
    hover: {
      y: -2,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="group cursor-pointer perspective-1000"
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      data-scroll
      data-scroll-direction="vertical"
      data-scroll-speed="1"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full"
      >
        {/* Skill Card */}
        <motion.div
          className="relative overflow-hidden w-full h-full p-6 flex flex-col items-center justify-center text-center rounded-2xl
          bg-gradient-to-br from-white/80 via-white/60 to-white/40
          dark:from-gray-900/80 dark:via-gray-800/60 dark:to-gray-700/40
          backdrop-blur-xl border border-white/20 dark:border-gray-600/30
          shadow-lg dark:shadow-2xl
          transition-all duration-500 ease-out
          min-h-[140px] sm:min-h-[160px] md:min-h-[180px]"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Animated Background Gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            animate={
              isHovered
                ? {
                    background: [
                      "linear-gradient(135deg, rgba(var(--primary), 0.1), rgba(var(--secondary), 0.05), transparent)",
                      "linear-gradient(225deg, rgba(var(--secondary), 0.1), rgba(var(--primary), 0.05), transparent)",
                      "linear-gradient(135deg, rgba(var(--primary), 0.1), rgba(var(--secondary), 0.05), transparent)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Floating Particles */}
          {isHovered && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary/40 rounded-full"
                  initial={{
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50,
                    opacity: 0,
                  }}
                  animate={{
                    x: Math.random() * 200 - 100,
                    y: Math.random() * 200 - 100,
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                />
              ))}
            </>
          )}

          {/* Skill Icon */}
          <motion.div
            variants={iconVariants}
            className="relative z-10 mb-4"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="relative"
              animate={
                isHovered
                  ? {
                      filter: [
                        "drop-shadow(0 0 0px rgba(var(--primary), 0))",
                        "drop-shadow(0 0 20px rgba(var(--primary), 0.5))",
                        "drop-shadow(0 0 0px rgba(var(--primary), 0))",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <img
                src={urlFor(skill.image).url()}
                alt={`${skill.title} skill icon`}
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain
                transition-all duration-300 filter group-hover:brightness-110"
                style={{
                  transform: "translateZ(20px)",
                }}
              />

              {/* Icon Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl opacity-0 group-hover:opacity-60"
                animate={
                  isHovered
                    ? {
                        scale: [1, 1.2, 1],
                        opacity: [0, 0.6, 0],
                      }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>

          {/* Skill Title */}
          <motion.div
            variants={textVariants}
            className="relative z-10"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.p
              className="text-sm sm:text-base md:text-lg font-semibold
              text-textlight dark:text-textdark
              group-hover:text-primary dark:group-hover:text-white
              transition-colors duration-300"
              style={{
                transform: "translateZ(10px)",
              }}
            >
              {skill.title}
            </motion.p>

            {/* Text Underline Effect */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
              style={{
                transform: "translateZ(5px)",
              }}
            />
          </motion.div>

          {/* Corner Accent */}
          <motion.div
            className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              clipPath: "polygon(0 100%, 100% 100%, 0 0)",
              transform: "translateZ(5px)",
            }}
          />
        </motion.div>

        {/* Hover Shadow Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
          style={{
            transform: "translateZ(-10px) scale(1.1)",
            filter: "blur(20px)",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Skill;
