'use client';

import { useEffect, useState } from 'react';

// Scrollspy: id of the section crossing the viewport's middle, via IntersectionObserver
export default function useActiveSection(sectionIds: readonly string[]) {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A thin band around the viewport's vertical middle decides "active"
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // sectionIds comes from a module-level constant — join keeps deps stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(',')]);

  return active;
}
