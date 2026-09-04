'use client';

/* eslint-disable react/no-unescaped-entities */
import { m } from 'framer-motion';
import Image from 'next/image';
import { memo, useCallback, useEffect, useRef, useState, type ComponentType, type MouseEvent } from 'react';
import { TbDownload, TbCheck } from 'react-icons/tb';
import { HiOutlineChevronDown, HiOutlineArrowRight } from 'react-icons/hi';
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import { urlFor } from '../sanity';
import { fadeInUp, staggerContainer } from '../shared/motionVariants';

type Props = {
  pageInfo: PageInfo;
  skills: Skills[];
  // ParticlesCanvas injected from index.tsx as a dynamic import
  ParticlesCanvas: ComponentType<{ skills: Skills[] }>;
};

const RESUME_FALLBACK_URL = '/CV_TranTanPhat_FrontendDev.pdf';
const RESUME_FILENAME = 'CV_TranTanPhat_FrontendDev.pdf';
const DOWNLOAD_DONE_MS = 2500;

/**
 * Sanity's CDN serves files inline by default and the HTML `download` attribute is
 * ignored cross-origin, so a plain link opens the PDF in a tab instead of saving it.
 * `?dl=<filename>` makes the CDN send `Content-Disposition: attachment`.
 */
const withForcedDownload = (url: string) => {
  if (!/^https?:\/\//.test(url)) return url;
  return `${url}${url.includes('?') ? '&' : '?'}dl=${encodeURIComponent(RESUME_FILENAME)}`;
};

const Hero = ({ pageInfo, skills, ParticlesCanvas }: Props) => {
  const [downloadState, setDownloadState] = useState<'idle' | 'loading' | 'done'>('idle');
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const resumeHref = withForcedDownload(
    pageInfo.heroResumeUrl?.asset?.url || RESUME_FALLBACK_URL
  );

  const handleDownload = useCallback(
    async (event: MouseEvent<HTMLAnchorElement>) => {
      // Let the browser own modified clicks (open in new tab, "Save link as", middle click)
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      event.preventDefault();
      if (downloadState === 'loading') return; // ignore double clicks while fetching

      clearTimeout(resetTimer.current);
      setDownloadState('loading');

      try {
        const response = await fetch(resumeHref);
        if (!response.ok) throw new Error(`Resume request failed: ${response.status}`);

        const blobUrl = URL.createObjectURL(await response.blob());
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = RESUME_FILENAME;
        document.body.appendChild(link);
        link.click();
        link.remove();
        // Revoke on the next tick — Safari cancels the download if the URL dies too soon
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);

        setDownloadState('done');
        resetTimer.current = setTimeout(() => setDownloadState('idle'), DOWNLOAD_DONE_MS);
      } catch (error) {
        // Happens when the origin isn't in Sanity's CORS allowlist (e.g. a preview deploy).
        // A same-tab navigation can't be popup-blocked, and `?dl=` still makes the CDN
        // send the file as an attachment, so the page stays put.
        console.error('Resume download failed, falling back to navigation:', error);
        setDownloadState('idle');
        window.location.href = resumeHref;
      }
    },
    [downloadState, resumeHref]
  );

  const typewriterWords =
    pageInfo.heroTypewriterWords?.length
      ? pageInfo.heroTypewriterWords
      : [pageInfo.name ?? 'Phat Tran', 'Front-end Developer', 'ReactJS Developer'];

  const [text] = useTypewriter({
    words: typewriterWords,
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <div className="h-screen clip-home bg-light dark:bg-dark relative flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Aurora backdrop — blurred gradient blobs, compositor-only drift */}
      <div className="hero-aurora" aria-hidden="true">
        <span className="hero-aurora__blob hero-aurora__blob--1" />
        <span className="hero-aurora__blob hero-aurora__blob--2" />
        <span className="hero-aurora__blob hero-aurora__blob--3" />
      </div>

      {/* Decorative particle canvas — lazy loaded, hidden from a11y tree */}
      <ParticlesCanvas skills={skills} />

      <m.div
        variants={staggerContainer(0.12, 0.15)}
        initial="hidden"
        animate="visible"
        className="relative z-20 flex flex-col items-center space-y-5 sm:space-y-7 px-4"
      >
        {/* Availability badge */}
        <m.div
          variants={fadeInUp}
          className="liquid-glass inline-flex items-center gap-2 sm:gap-2.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium
            text-textlight dark:text-textdark"
        >
          <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-full w-full rounded-full bg-green-500" />
          </span>
          {pageInfo.heroBadgeText || 'Open to new opportunities'}
        </m.div>

        {/* Avatar — LCP element, eager-loaded; rotating gradient ring */}
        <m.div variants={fadeInUp} className="relative h-24 w-24 sm:h-36 sm:w-36">
          <span
            className="absolute -inset-1 rounded-full animate-spin-slow blur-[3px] opacity-80
              bg-[conic-gradient(from_0deg,#6366f1,#8b5cf6,#22d3ee,#6366f1)]"
            aria-hidden="true"
          />
          <span
            className="absolute -inset-[3px] rounded-full animate-spin-slow
              bg-[conic-gradient(from_0deg,#6366f1,#8b5cf6,#22d3ee,#6366f1)]"
            aria-hidden="true"
          />
          <div className="relative h-full w-full rounded-full overflow-hidden ring-2 sm:ring-4 ring-light dark:ring-dark">
            {pageInfo.avatarHero && (
              <Image
                src={urlFor(pageInfo.avatarHero).width(288).height(288).url()}
                alt={`${pageInfo.name ?? 'Phat Tran'} - Frontend Developer profile photo`}
                fill
                className="object-cover rounded-full"
                priority
                sizes="(max-width: 639px) 96px, 144px"
              />
            )}
          </div>
        </m.div>

        {/* Role — hidden on mobile to keep the hero compact; <p> not <h2> keeps h1 first in the heading outline */}
        <m.p
          variants={fadeInUp}
          className="hidden sm:block text-sm md:text-base uppercase text-textlight dark:text-textdark tracking-[6px] md:tracking-[12px]"
        >
          {pageInfo.role}
        </m.p>

        <m.h1
          variants={fadeInUp}
          className="text-3xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
        >
          <span>I'm</span>{' '}
          <span
            className="mr-3 text-transparent bg-clip-text bg-gradient-to-r
              from-blue-600 via-indigo-600 to-cyan-400
              dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-300"
          >
            {text}
          </span>
          <Cursor cursorColor="var(--hero-cursor-color)" />
        </m.h1>

        {/* CTA row — "View Projects" hidden on mobile to keep the hero to one primary action */}
        <m.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <m.a
            href="#projects"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="hidden sm:inline-flex items-center gap-2 font-semibold px-7 py-3 rounded-full text-white
              bg-gradient-to-r from-primary to-secondary
              shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40
              transition-shadow duration-300
              focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            View Projects <HiOutlineArrowRight aria-hidden="true" />
          </m.a>

          <m.div
            whileHover={downloadState === 'loading' ? undefined : { scale: 1.04 }}
            whileTap={downloadState === 'loading' ? undefined : { scale: 0.97 }}
            className="inline-block"
          >
            <a
              href={resumeHref}
              download={RESUME_FILENAME}
              onClick={handleDownload}
              aria-label="Download Resume as PDF"
              aria-busy={downloadState === 'loading'}
              className={`inline-flex items-center justify-center gap-2 min-w-[210px] font-medium px-7 py-3 rounded-full
                border backdrop-blur-md transition-colors duration-300
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                ${
                  downloadState === 'done'
                    ? 'border-green-500/60 text-green-600 dark:text-green-400 bg-green-500/10 cursor-default'
                    : downloadState === 'loading'
                    ? 'border-primary/40 text-primary bg-white/60 dark:bg-white/5 cursor-wait'
                    : 'border-primary/40 text-primary bg-white/60 dark:bg-white/5 hover:bg-primary hover:text-white hover:border-primary'
                }`}
            >
              {downloadState === 'loading' ? (
                <>
                  Preparing...
                  <span
                    className="w-[18px] h-[18px] rounded-full border-2 border-current border-t-transparent animate-spin"
                    aria-hidden="true"
                  />
                </>
              ) : downloadState === 'done' ? (
                <>
                  Downloaded <TbCheck className="text-xl" aria-hidden="true" />
                </>
              ) : (
                <>
                  Download Resume <TbDownload className="text-xl" aria-hidden="true" />
                </>
              )}
            </a>
            <span role="status" aria-live="polite" className="sr-only">
              {downloadState === 'loading'
                ? 'Preparing your resume download'
                : downloadState === 'done'
                ? 'Resume downloaded'
                : ''}
            </span>
          </m.div>
        </m.div>
      </m.div>

      {/* Scroll cue — pure CSS bounce */}
      <m.a
        href="#about"
        aria-label="Scroll to the About section"
        className="absolute bottom-[15%] z-20 text-textlight dark:text-textdark/80 hover:text-primary dark:hover:text-primary transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <HiOutlineChevronDown className="w-6 h-6 sm:w-7 sm:h-7 animate-bounce" aria-hidden="true" />
      </m.a>
    </div>
  );
};

export default memo(Hero);
