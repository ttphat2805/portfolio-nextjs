'use client';

import { AnimatePresence, m } from 'framer-motion';
import { BiSun } from 'react-icons/bi';
import { BsMoonStars } from 'react-icons/bs';
import type { Theme } from '../hooks/useTheme';

type Props = {
  theme: Theme;
  toggleTheme: () => void;
};

const DarkMode = ({ theme, toggleTheme }: Props) => {
  const isDark = theme === 'dark';

  return (
    <button
      className={`flex items-center h-[38px] w-[70px] cursor-pointer transition-all shadow-md
        hover:brightness-105 backdrop-blur-lg bg-white dark:bg-textdark/20 rounded-full duration-300
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
        ${isDark ? 'justify-end' : 'justify-start'}`}
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      type="button"
    >
      <m.div
        layout
        className="h-[35px] w-[35px] rounded-full overflow-hidden bg-primary relative"
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <AnimatePresence initial={false} mode="wait">
          {isDark ? (
            <m.span
              key="moon"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <BsMoonStars className="text-white text-xl" aria-hidden="true" />
            </m.span>
          ) : (
            <m.span
              key="sun"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <BiSun className="text-white text-xl" aria-hidden="true" />
            </m.span>
          )}
        </AnimatePresence>
      </m.div>
    </button>
  );
};

export default DarkMode;
