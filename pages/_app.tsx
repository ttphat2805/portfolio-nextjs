import { domAnimation, LazyMotion } from "framer-motion";
import "locomotive-scroll/dist/locomotive-scroll.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Tran Tan Phat - Frontend Developer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="title"
          content="Tran Tan Phat - Frontend Developer Portfolio"
        />
        <meta
          name="description"
          content="Hi, I'm Phat – a frontend developer with passion for modern web."
        />

        {/* Favicon */}
        <link rel="icon" href="/rel-images.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Open Graph / Facebook */}
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

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Tran Tan Phat - Frontend Portfolio"
        />
        <meta name="twitter:description" content="Tran Tan Phat Portfolio" />
        <meta
          name="twitter:image"
          content="https://portfolio-ttp.vercel.app/preview.png"
        />
      </Head>

      <LazyMotion features={domAnimation}>
        <Component {...pageProps} />
      </LazyMotion>
    </>
  );
}
