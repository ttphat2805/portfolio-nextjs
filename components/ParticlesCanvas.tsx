'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useMemo } from 'react';
import { urlFor } from '../sanity';

type Props = {
  skills: Skills[];
};

/**
 * Floating skill icons — replaces tsparticles.
 *
 * Why framer-motion instead of tsparticles?
 * - tsparticles causes unavoidable "jumps": outModes:'out' teleports, outModes:'bounce'
 *   causes instant velocity reversal, repulse causes sudden force spikes.
 * - framer-motion with easeInOut + repeatType:'reverse' is mathematically guaranteed
 *   to never jump — it's a continuous smooth curve from start → end → start.
 */
const ParticlesCanvas = ({ skills }: Props) => {
  // Deterministic grid-like spread using golden angle distribution
  // Avoids Math.random() (SSR mismatch) while spreading icons evenly
  const positions = useMemo(() => {
    const goldenAngle = 137.508; // degrees — fills space without clustering
    return skills.map((_, i) => ({
      // Spread across 10–90% of width/height so icons don't hug edges
      left: 10 + ((i * goldenAngle) % 80),
      top: 10 + ((i * 97.3) % 78),
    }));
  }, [skills]);

  if (!skills.length) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {skills.map((skill, i) => {
        // Each icon gets a unique float distance and duration
        // so they don't all sync up and move as one block
        const floatX = (i % 2 === 0 ? 1 : -1) * (20 + (i % 4) * 8); // ±20–44px
        const floatY = (i % 3 === 0 ? 1 : -1) * (25 + (i % 5) * 8); // ±25–57px
        const duration = 3 + (i % 5) * 0.8; // 3s – 6s (was 6–15s)
        const delay = i * 0.2;

        return (
          <motion.div
            key={skill._id ?? i}
            className="absolute"
            style={{
              left: `${positions[i].left}%`,
              top: `${positions[i].top}%`,
            }}
            animate={{
              x: [0, floatX, 0],
              y: [0, floatY, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              repeatType: 'reverse', // rewinds the same path — guaranteed no jump
              ease: 'easeInOut',     // gradual accel/decel — smooth as breathing
            }}
          >
            <div className="relative w-10 h-10 opacity-100 transition-opacity duration-300">
              {skill.image && (
                <Image
                  src={urlFor(skill.image).width(80).height(80).url()}
                  alt={skill.title ?? ''}
                  fill
                  className="object-contain"
                  loading="lazy"
                  sizes="40px"
                />
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ParticlesCanvas;
