import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to Sanity CDN for faster image loads */}
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />

        {/* Preconnect to EmailJS for contact form */}
        <link rel="preconnect" href="https://api.emailjs.com" />
        <link rel="dns-prefetch" href="https://api.emailjs.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
