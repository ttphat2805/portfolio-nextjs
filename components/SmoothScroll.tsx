'use client';

// ✅ @studio-freight/lenis has been renamed to 'lenis'
import Lenis from 'lenis';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

/**
 * SmoothScroll — replaces react-locomotive-scroll (unmaintained)
 * Uses @studio-freight/lenis, the modern successor by the same authors.
 *
 * Note: 'use client' is for future App Router compatibility.
 * In Pages Router this component is already client-side by default.
 */
export default function SmoothScroll({ children }: Props) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
