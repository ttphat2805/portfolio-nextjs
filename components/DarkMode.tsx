'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { BiSun } from 'react-icons/bi';
import { BsMoonStars } from 'react-icons/bs';

type Props = {
  theme: boolean;
  setTheme: (value: boolean) => void;
};

const DarkMode = ({ theme, setTheme }: Props) => {
  return (
    <button
      className={`flex items-center h-[38px] w-[70px] cursor-pointer transition-all shadow-md
        hover:brightness-105 backdrop-blur-lg bg-white dark:bg-textdark/20 rounded-full duration-300
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        ${!theme ? 'justify-end' : 'justify-start'}`}
      onClick={() => setTheme(!theme)}
      aria-label={theme ? 'Switch to dark mode' : 'Switch to light mode'}
      aria-pressed={!theme}
      type="button"
    >
      <motion.div
        layout
        className="h-[35px] w-[35px] rounded-full overflow-hidden bg-primary relative"
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <AnimatePresence initial={false} mode="wait">
          {theme ? (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <BiSun className="text-white text-xl" aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <BsMoonStars className="text-white text-xl" aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
};

export default DarkMode;
