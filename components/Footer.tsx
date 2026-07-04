'use client';

import { AiFillHeart } from 'react-icons/ai';
import { HiOutlineArrowUp } from 'react-icons/hi';
import { NAV_LINKS } from '../shared/contants';
import SocialIcon from './SocialIcon';

type Props = {
  socials?: Socials[];
};

const Footer = ({ socials = [] }: Props) => {
  return (
    <footer className="relative bg-white dark:bg-dark overflow-hidden">
      {/* Animated gradient hairline */}
      <div className="gradient-hairline absolute top-0 left-0 right-0 h-px" aria-hidden="true" />

      {/* Ambient glow */}
      <div
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[480px] h-[240px] rounded-full bg-primary/10 dark:bg-primary/15 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-6">
        {/* Bottom bar */}
        <div className="border-t border-gray-100 dark:border-gray-800/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <p className="text-sm text-black dark:text-white">
            © {new Date().getFullYear()} — Coded with love by Tran Tan Phat{' '}
            <AiFillHeart className="ml-1 text-red-500 inline" aria-label="love" />
          </p>

          <a
            href="#hero"
            className="liquid-glass liquid-glass-lift inline-flex items-center gap-2 px-4 py-2 rounded-full
              text-sm font-medium text-textlight dark:text-textdark
              hover:text-primary dark:hover:text-primary
              focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Back to top <HiOutlineArrowUp aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
