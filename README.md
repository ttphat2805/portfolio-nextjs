# Phat Tran — Portfolio

Personal portfolio site for Tran Tan Phat, Frontend Developer. Built with Next.js (Pages Router), Sanity as a headless CMS, Tailwind CSS, and Framer Motion.

**Live site:** https://portfolio-ttp.vercel.app

## Features

- **Content managed via Sanity** — About, Skills, Projects, and Socials are all editable from an embedded Studio, no redeploy needed for content changes (ISR revalidates every 60s).
- **Dark mode** — defaults to OS preference, persists an explicit toggle in `localStorage`, applied before first paint (no flash of wrong theme).
- **Smooth scrolling & scroll-triggered animations** — Lenis for inertial scrolling, Framer Motion (`m` + `LazyMotion`) for reveal-on-scroll and micro-interactions, with `prefers-reduced-motion` respected throughout.
- **Liquid-glass UI** — translucent, blurred surfaces (nav pill, badges, chips) consistent across light/dark.
- **Scrollspy navigation** — the header nav highlights the section currently in view via `IntersectionObserver`.
- **SEO** — semantic landmarks, Open Graph/Twitter cards, canonical URL, JSON-LD structured data.
- **Contact form** — React Hook Form + EmailJS, with inline validation and status states.

## Tech stack

| Layer      | Choice                                    |
| ---------- | ------------------------------------------ |
| Framework  | Next.js 15 (Pages Router), React 19, TypeScript |
| CMS        | Sanity 3 (embedded Studio at `/studio`)   |
| Styling    | Tailwind CSS                              |
| Animation  | Framer Motion, Lenis, CSS keyframes       |
| Forms      | React Hook Form + EmailJS                 |
| Deployment | Vercel                                    |

## Getting started

Requires Node 24.x (see `.nvmrc`).

```bash
nvm use
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the site, or [http://localhost:3000/studio](http://localhost:3000/studio) for the Sanity Studio.

### Environment variables

Copy `.env.local.example` (or create `.env.local`) with:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
```

Sanity project settings (API tokens, CORS origins, team members) are managed at `https://www.sanity.io/manage/project/<project-id>`.

## Scripts

| Command              | Description                          |
| --------------------- | ------------------------------------- |
| `npm run dev`          | Start the dev server                  |
| `npm run build`        | Production build                      |
| `npm run start`        | Serve the production build            |
| `npm run lint`         | Run ESLint                            |
| `npm run type-check`   | Run `tsc --noEmit`                    |

## Project structure

```
components/   UI components (Hero, About, Skills, Projects, Contact, Header, Footer, ...)
hooks/        Client hooks (useTheme, useActiveSection)
pages/        Next.js routes, incl. /studio (Sanity Studio) and /api (read-only Sanity proxies)
schemas/      Sanity content schemas (PageInfo, Skill, Projects, Socials)
shared/       Shared constants (nav links, EmailJS config, date formatting)
styles/       Tailwind + global CSS
```

## Content model

Content lives in Sanity and is fetched at build time via GROQ (`getStaticProps` + ISR, revalidated every 60s):

- **PageInfo** — name, role, summary, avatar/background images, contact details
- **Skill** — technical skills shown in the Skills grid
- **Project** — portfolio projects with linked technologies
- **Socials** — social profile links shown in the header/footer

## Deployment

Deployed on Vercel. Pushing to `main` triggers a production deploy; make sure the environment variables above are configured in the Vercel project settings.
