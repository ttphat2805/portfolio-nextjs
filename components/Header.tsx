'use client';

import { m } from 'framer-motion';
import { memo } from 'react';
import useActiveSection from '../hooks/useActiveSection';
import type { Theme } from '../hooks/useTheme';
import { NAV_LINKS } from '../shared/contants';
import DarkMode from './DarkMode';
import SocialIcon from './SocialIcon';

type Props = {
  socials: Socials[];
  theme: Theme;
  toggleTheme: () => void;
};

// 'hero' included so the indicator clears when scrolled back to the top
const SECTION_IDS = ['hero', ...NAV_LINKS.map(({ href }) => href.slice(1))];

const Header = ({ socials = [], theme, toggleTheme }: Props) => {
  const activeSection = useActiveSection(SECTION_IDS);

  return (
    <header className="sticky top-3 z-50 px-3">
      <m.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="liquid-glass max-w-5xl mx-auto rounded-full pl-4 pr-2 py-1.5
          flex items-center justify-between gap-3"
      >
        {/* Social Icons */}
        <nav aria-label="Social media links" className="flex items-center gap-0.5">
          {socials.map((social: Socials, index: number) => (
            <SocialIcon key={social._id ?? index} title={social.title} url={social.url} />
          ))}
        </nav>

        {/* In-page navigation with sliding active indicator — desktop */}
        <nav aria-label="Section navigation" className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = activeSection === href.slice(1);
            return (
              <a
                key={href}
                href={href}
                aria-current={isActive ? 'true' : undefined}
                className={`relative px-4 py-2 text-sm font-medium rounded-full
                  transition-colors duration-300
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
                  ${
                    isActive
                      ? 'text-primary dark:text-white'
                      : 'text-textlight dark:text-textdark hover:text-primary dark:hover:text-primary'
                  }`}
              >
                {/* Shared-layout pill glides between active links */}
                {isActive && (
                  <m.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-primary/15 dark:bg-primary/25
                      border border-primary/25"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{label}</span>
              </a>
            );
          })}
        </nav>

        {/* Dark / Light Mode Toggle */}
        <DarkMode theme={theme} toggleTheme={toggleTheme} />
      </m.div>
    </header>
  );
};

export default memo(Header);
