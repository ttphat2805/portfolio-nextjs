'use client';

import { domAnimation, LazyMotion } from 'framer-motion';
import type { AppProps } from 'next/app';
import Head from 'next/head';
// ✅ next/font replaces @next/font (merged in Next.js 13.2+)
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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.variable} ${pacifico.variable}`}>
      <Head>
        <title>Tran Tan Phat - Frontend Developer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="title"
          content="Tran Tan Phat - Frontend Developer Portfolio"
        />
        <meta
          name="description"
          content="Hi, I'm Phat – a frontend developer with passion for modern web. Specializing in React, Next.js, and TypeScript."
        />
        <meta
          name="keywords"
          content="Frontend Developer, React, Next.js, TypeScript, Portfolio, Vietnam"
        />
        <meta name="author" content="Tran Tan Phat" />

        {/* Favicon */}
        <link rel="icon" href="/rel-images.png" type="image/png" />
        <link rel="apple-touch-icon" href="/rel-images.png" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Tran Tan Phat - Portfolio" />
        <meta
          property="og:description"
          content="Frontend Developer portfolio showcasing React, Next.js, and more."
        />
        <meta
          property="og:image"
          content="https://portfolio-ttp.vercel.app/preview.png"
        />
        <meta property="og:url" content="https://portfolio-ttp.vercel.app" />
        <meta property="og:site_name" content="Tran Tan Phat Portfolio" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Tran Tan Phat - Frontend Portfolio"
        />
        <meta
          name="twitter:description"
          content="Frontend Developer portfolio — React, Next.js, TypeScript"
        />
        <meta
          name="twitter:image"
          content="https://portfolio-ttp.vercel.app/preview.png"
        />
      </Head>

      {/* Skip navigation for keyboard / screen reader accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* SmoothScroll wraps the whole app — replaces react-locomotive-scroll */}
      <SmoothScroll>
        <LazyMotion features={domAnimation}>
          <Component {...pageProps} />
        </LazyMotion>
      </SmoothScroll>
    </div>
  );
}
