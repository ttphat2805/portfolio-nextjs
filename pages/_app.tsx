import { domAnimation, LazyMotion } from "framer-motion";
import "locomotive-scroll/dist/locomotive-scroll.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="/rounded-avatar.png"
          type="image/x-icon"
        />

        <title>{`Tran Tan Phat - Portfolio`}</title>

        <meta name="title" content="Tran Tan Phat Portfolio" />
        <meta name="description" content="Tran Tan Phat Portfolio" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Tran Tan Phat Portfolio" />
        <meta property="og:description" content="Tran Tan Phat Portfolio" />
        <meta property="og:image" content="/avatar.jpg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Tan Phat Portfolio" />
        <meta
          property="twitter:description"
          content="Tran Tan Phat Portfolio"
        />
        <meta property="twitter:image" content="/avatar.jpg" />
      </Head>
      <LazyMotion features={domAnimation}>
        <Component {...pageProps} />
      </LazyMotion>
    </>
  );
}
