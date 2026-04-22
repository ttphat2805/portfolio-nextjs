'use client';

import { motion } from 'framer-motion';
import { memo } from 'react';
import { SocialIcon } from 'react-social-icons';
import DarkMode from './DarkMode';

type Props = {
  socials: Socials[];
  theme: boolean;
  setTheme: (value: boolean) => void;
};

const Header = ({ socials = [], theme, setTheme }: Props) => {
  return (
    <header
      className="sticky top-0 bg-light/90 dark:bg-dark/90 backdrop-blur-sm h-full pt-2 z-50 border-b border-gray-100 dark:border-gray-800/50"
      role="banner"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto px-3 py-1">
        {/* Social Icons */}
        <nav aria-label="Social media links">
          <motion.div
            className="flex items-center gap-3 text-gray-500"
            initial={{ x: -500, opacity: 0, scale: 0.5 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            {socials.map((social: Socials, index: number) => (
              <SocialIcon
                key={social._id ?? index}
                title={social.title}
                url={social.url}
                fgColor="gray"
                bgColor="transparent"
                aria-label={`Visit my ${social.title} profile (opens in new tab)`}
                target="_blank"
                rel="noopener noreferrer"
              />
            ))}
          </motion.div>
        </nav>

        {/* Dark / Light Mode Toggle */}
        <motion.div
          className="flex items-center cursor-pointer"
          initial={{ x: 500, opacity: 0, scale: 0.5 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <DarkMode theme={theme} setTheme={setTheme} />
        </motion.div>
      </div>
    </header>
  );
};

export default memo(Header);
