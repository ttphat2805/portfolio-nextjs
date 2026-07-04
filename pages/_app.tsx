'use client';

import { LazyMotion, MotionConfig } from 'framer-motion';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Inter, Pacifico } from 'next/font/google';
import SmoothScroll from '../components/SmoothScroll';
import '../styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
  preload: false,
});

// Truly lazy-load the full framer-motion feature set.
// Importing `domMax` synchronously defeats the purpose of LazyMotion and
// triggers the "motion inside LazyMotion" tree-shaking warning in strict mode.
const loadFeatures = () =>
  import('framer-motion').then((mod) => mod.domMax);

const SITE_URL = 'https://portfolio-ttp.vercel.app';

// Structured data — helps Google show a rich "Person" result
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Tran Tan Phat',
  jobTitle: 'Frontend Developer',
  url: SITE_URL,
  knowsAbout: ['React', 'Next.js', 'TypeScript', 'Frontend Development'],
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // Sanity Studio manages its own scroll — skip Lenis on the studio route
  const isStudio = router.pathname.startsWith('/studio');

  const meta = (
    <Head>
      <title>Tran Tan Phat - Frontend Developer</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content="Hi, I'm Phat – a frontend developer with passion for modern web. Specializing in React, Next.js, and TypeScript."
      />
      <meta name="author" content="Tran Tan Phat" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={SITE_URL} />

      {/* Favicon */}
      <link rel="icon" href="/rel-images.png" type="image/png" />
      <link rel="apple-touch-icon" href="/rel-images.png" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content="Tran Tan Phat - Frontend Developer Portfolio" />
      <meta
        property="og:description"
        content="Frontend Developer portfolio showcasing React, Next.js, and TypeScript projects."
      />
      <meta property="og:image" content={`${SITE_URL}/preview.png`} />
      <meta property="og:image:alt" content="Preview of Tran Tan Phat's portfolio website" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:site_name" content="Tran Tan Phat Portfolio" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Tran Tan Phat - Frontend Portfolio" />
      <meta
        name="twitter:description"
        content="Frontend Developer portfolio — React, Next.js, TypeScript"
      />
      <meta name="twitter:image" content={`${SITE_URL}/preview.png`} />

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </Head>
  );

  // Sanity Studio: no framer-motion, no Lenis — render completely bare
  if (isStudio) {
    return (
      <div className={`${inter.variable} ${pacifico.variable}`}>
        {meta}
        <Component {...pageProps} />
      </div>
    );
  }

  return (
    <div className={`${inter.variable} ${pacifico.variable}`}>
      {meta}

      {/* Skip navigation for keyboard / screen reader accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* LazyMotion with async feature loader — keeps full `motion` out of the main bundle.
          strict=true enforces that all animated elements use `m` (not `motion`). */}
      <LazyMotion features={loadFeatures} strict>
        <MotionConfig reducedMotion="user">
          <SmoothScroll>
            <Component {...pageProps} />
          </SmoothScroll>
        </MotionConfig>
      </LazyMotion>
    </div>
  );
}
