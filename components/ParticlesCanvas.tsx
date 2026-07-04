'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import { urlFor } from '../sanity';

type Props = {
  skills: Skills[];
};

// Cap how many float on mobile — a dozen+ icons crowds a small hero screen
const MOBILE_ICON_LIMIT = 8;

// Floating skill icons, drifting via CSS keyframes instead of a JS animation loop
const ParticlesCanvas = ({ skills }: Props) => {
  // Golden-angle spread keeps icons deterministic (no SSR mismatch) and even
  const positions = useMemo(() => {
    const goldenAngle = 137.508;
    return skills.map((_, i) => ({
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
        // Unique distance/duration per icon so they don't move in lockstep
        const driftX = (i % 2 === 0 ? 1 : -1) * (20 + (i % 4) * 8); // ±20–44px
        const driftY = (i % 3 === 0 ? 1 : -1) * (25 + (i % 5) * 8); // ±25–57px
        const duration = 6 + (i % 5) * 1.6; // 6s – 12.4s

        return (
          <div
            key={skill._id ?? i}
            className={`absolute animate-drift ${i >= MOBILE_ICON_LIMIT ? 'hidden sm:block' : ''}`}
            style={
              {
                left: `${positions[i].left}%`,
                top: `${positions[i].top}%`,
                '--drift-x': `${driftX}px`,
                '--drift-y': `${driftY}px`,
                animationDuration: `${duration}s`,
                animationDelay: `${i * 0.2}s`,
              } as React.CSSProperties
            }
          >
            <div className="relative w-10 h-10">
              {skill.image && (
                <Image
                  src={urlFor(skill.image).width(80).fit('max').url()}
                  alt=""
                  fill
                  className="object-contain"
                  loading="lazy"
                  sizes="40px"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ParticlesCanvas;
