import { Html, Head, Main, NextScript } from "next/document";
import { themeInitScript } from "../hooks/useTheme";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Apply dark/light class before first paint — prevents theme flash */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />

        {/* Browser UI color (address bar on mobile) per color scheme */}
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f1f5f9" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0f172a" />
        <meta name="color-scheme" content="dark light" />

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
