'use client';

import { Fragment, memo } from 'react';
import SectionHeading from './SectionHeading';
import Skill from './Skill';

type Props = {
  skills: Skills[];
};

const SkeletonCard = ({ index }: { index: number }) => (
  <div
    className="animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-700 p-6 min-h-[140px] sm:min-h-[160px] md:min-h-[180px] flex flex-col items-center justify-center gap-4"
    style={{ animationDelay: `${index * 0.05}s` }}
    aria-hidden="true"
  >
    <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gray-300 dark:bg-gray-600 rounded-full" />
    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
  </div>
);

const Skills = ({ skills }: Props) => {
  return (
    <div className="flex flex-col relative min-h-screen text-center md:text-left max-w-7xl px-6 md:px-10 justify-evenly mx-auto pt-24">
      <SectionHeading id="skills-heading" eyebrow="What I work with" title="Skills" />

      {/* Decorative background gradient animation */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="w-[500px] md:w-[800px] absolute mix-blend-screen overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="Gradient1" cx="50%" cy="50%" fx="10%" fy="50%" r=".5">
            <animate attributeName="fx" dur="34s" values="0%;10%;0%" repeatCount="indefinite" />
            <stop offset="0%" stopColor="#FFE47A" />
            <stop offset="100%" stopColor="#00aeef00" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient1)">
          <animate attributeName="x" dur="20s" values="25%;0%;25%" repeatCount="indefinite" />
          <animate attributeName="y" dur="21s" values="0%;25%;0%" repeatCount="indefinite" />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="17s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>

      {/* Skills grid with skeleton loading state */}
      <ul
        className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-8 mx-auto md:mt-0 mt-10 list-none p-0"
        aria-label="Technical skills"
      >
        {skills.length === 0
          ? Array.from({ length: 8 }).map((_, i) => (
              <li key={i}>
                <SkeletonCard index={i} />
              </li>
            ))
          : skills.map((item, index) => (
              <Fragment key={item._id ?? index}>
                <Skill skill={item} index={index} />
              </Fragment>
            ))}
      </ul>
    </div>
  );
};

export default memo(Skills);
