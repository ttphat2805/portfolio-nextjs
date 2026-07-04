'use client';

import { m, useScroll, useSpring } from 'framer-motion';

// Thin scroll-progress bar; scaleX driven by motion values, no re-renders
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <m.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left bg-gradient-to-r from-primary via-secondary to-primary will-change-transform"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;
