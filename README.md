# Ascendant Growth Partners

An editorial marketing site for an executive advisory firm, built as an
implementation of a provided strategic brief — the goal was to *elevate the
execution* of the client's vision, not to redesign it.

The experience aims to feel editorial, calm, and premium: serif display
typography, a warm off‑white palette with a single deep navy accent, generous
whitespace, border‑led structure, and motion you feel rather than notice.

**Live demo:** _add your Vercel URL_

---

## Tech stack

- **Next.js (App Router)** — Server Components by default, static rendering
- **React + TypeScript** — strict, fully typed components
- **Tailwind CSS v4** — CSS‑first theme; design tokens as the source of truth
- **shadcn/ui** (Base UI) — Button, Card, Accordion, Separator, Navigation Menu
- **Lucide React** — icons, one stroke width, one size scale
- **next/font** — self‑hosted Newsreader (display) + Public Sans (body), zero CLS
- **next/og** — generated Open Graph / social preview image

No other runtime dependencies. Motion is CSS‑driven — Framer Motion was
deliberately **not** added, since fades, glides and staggered reveals are
achievable with transitions that also honour `prefers-reduced-motion` for free.

---

## Features

- **Editorial homepage** — hero, philosophy strip, business reality, capabilities,
  a Growth Architecture methodology timeline, comparison, insights, principles,
  FAQ, and a closing CTA — sequenced to answer an executive's questions in order.
- **Premium navigation** — sticky header that transitions transparent → frosted
  and shrinks on scroll, retracts on scroll‑down, an intent‑delayed mega menu
  with a graceful close, inline‑expanding search, and a full‑screen mobile drawer.
- **Interior pages** — Contact (accessible form with inline validation, loading
  and success states), Insights (working category filter, pagination placeholder,
  editorial empty state), and About.
- **Design system** — tokenised colour, type scale, spacing, radius, elevation and
  motion, with an internal `/style-guide` that verifies colour contrast from the
  live token values.
- **Production touches** — reading‑progress bar, editorial 404, `robots.txt`,
  `sitemap.xml`, Organization/WebSite JSON‑LD, per‑page metadata + canonicals,
  and a generated social preview image.

---

## Folder structure

```
app/                     Routes, metadata, robots, sitemap, OG image, 404
components/
  navigation/            Header, mega menu, search, mobile drawer, nav config
  hero/                  Hero and its parts
  sections/              Homepage body sections + shared section data
  contact/  insights/    Page‑specific components
  layout/                Footer
  typography/            Heading, Eyebrow, Text primitives
  shared/                Container, Section, Reveal, PageHeader, EmptyState, …
  ui/                    shadcn primitives (Button, Card, Accordion, …)
lib/                     site-config, utils (cn)
```

Every section is self‑contained and composed from shared primitives, so the
site scales from a handful of pages to dozens without new patterns.

---

## Design philosophy

- **Tokens first.** Colour, type, spacing, radius, elevation and motion are
  defined once in `app/globals.css` and consumed everywhere. Changing a token
  re‑themes the whole site, shadcn components included.
- **Semantics before size.** Headings choose their level from document
  structure and their size from design, independently — a small heading never
  costs a broken outline.
- **Borders over shadows.** Structure is carried by hairlines and surface value;
  shadow is reserved for elements that genuinely float.
- **Invisible motion.** Three durations, one decelerating curve; everything
  transform/opacity only, all suppressed under reduced motion.

See `IMPLEMENTATION_NOTES.md` for the reasoning behind the key decisions.

---

## Performance & quality goals

- Static rendering for every route; self‑hosted fonts (no CLS)
- Transform/opacity‑only animation; minimal client components
- Targets: LCP < 2.5s, CLS ≈ 0, Lighthouse Performance 95+, Accessibility 100,
  SEO 100

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

Set `NEXT_PUBLIC_SITE_URL` in the deployment environment so canonical URLs,
sitemap and OG tags resolve to the production origin.

---

## Deployment

Optimised for Vercel. Push the repository, import it, set
`NEXT_PUBLIC_SITE_URL`, and deploy.

---

## Screenshots

_Add homepage, mega menu, and a mobile view here._
