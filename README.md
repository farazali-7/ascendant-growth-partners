# Ascendant Growth Partners

A marketing site for a fictional executive advisory firm. It was built as an
implementation of a written brief: the direction — editorial, calm, minimal —
was fixed in advance, and the work was to execute it well rather than reinvent
it.

The site is content-only. There is no database, no authentication, and no API
layer; every route renders statically from data that lives in the repository.
Most of the effort went into typography, spacing, an internally consistent
design‑token system, and interaction details that hold up on a second look.

## Screenshots

```
/public/screenshots/home.png
/public/screenshots/mega-menu.png
/public/screenshots/mobile.png
```

## Features

### Homepage

- A hero with a staggered load sequence and a small scroll parallax on the
  abstract SVG visual
- Body sections in a deliberate order — philosophy, the business reality,
  capabilities, a five‑stage methodology timeline, a traditional‑vs‑AGP
  comparison, insights, principles, an FAQ, and a closing call to action
- Section entrances that fade and settle once, on scroll, via a single
  `IntersectionObserver` primitive

### Navigation

- Sticky header that starts transparent and transitions to a frosted, shorter
  bar on scroll, and retracts on downward scroll
- A mega menu with hover‑intent open/close delays and a keyboard path
- Search that expands inline from its icon instead of navigating away
- A full‑screen mobile drawer with a hamburger‑to‑close morph, body‑scroll
  lock, focus trap, and focus return
- Active‑route underline derived from the current path

### Pages

- **Contact** — an accessible form with inline validation, a loading state, and
  a success state (submission is simulated; there is no backend yet)
- **Insights** — a working category filter over a static catalogue, a
  pagination placeholder, and an editorial empty state
- **About** — mission, philosophy, and shared principles / CTA sections
- **Style guide** — an internal, non‑indexed page that renders the design
  tokens and computes colour‑contrast ratios from the live values

### Production details

- Per‑page metadata with canonical URLs, a generated Open Graph image,
  `robots.txt`, `sitemap.xml`, and Organization / WebSite JSON‑LD
- A custom 404 page and a hairline reading‑progress bar
- Reduced‑motion support applied globally

## Tech Stack

**Framework**

- Next.js 16 (App Router, Turbopack)
- React 19

**Language**

- TypeScript 5

**Styling**

- Tailwind CSS v4 (CSS‑first theme; tokens defined in `app/globals.css`)
- `tw-animate-css`
- `class-variance-authority`, `tailwind-merge`, `clsx` for variant and class
  composition

**UI**

- shadcn/ui built on Base UI (`@base-ui/react`) — Button, Card, Accordion,
  Separator, Navigation Menu
- Lucide React for icons

**Fonts**

- `next/font` self‑hosting Newsreader (display) and Public Sans (body)

**SEO / social**

- `next/og` for the social preview image
- Metadata API, `robots` and `sitemap` file conventions, JSON‑LD

**Tooling**

- ESLint with `eslint-config-next`

## Project Structure

```text
app/
  about/            About page
  contact/          Contact page
  insights/         Insights index
  style-guide/      Internal design-token reference (noindex)
  layout.tsx        Root layout, metadata, fonts, header/footer
  page.tsx          Homepage composition
  globals.css       Design tokens, base styles, motion, reduced-motion
  opengraph-image.tsx
  robots.ts
  sitemap.ts
  not-found.tsx
components/
  navigation/       Header, mega menu, search, mobile drawer, nav config
  hero/             Hero and its parts
  sections/         Homepage body sections + section data
  contact/          Contact form
  insights/         Insights explorer + data
  layout/           Footer
  typography/       Heading, Eyebrow, Text
  shared/           Container, Section, Reveal, PageHeader, EmptyState,
                    ReadingProgress, StructuredData, SkipLink
  ui/               shadcn primitives
lib/
  site-config.ts    Site-level constants
  utils.ts          cn() with a tailwind-merge extension
public/             Static assets
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server (http://localhost:3000):

```bash
npm run dev
```

Build and serve a production build:

```bash
npm run build
npm start
```

Lint:

```bash
npm run lint
```

## Environment Variables

The project runs without any environment configuration. One optional variable
is read at build time:

| Variable              | Required | Description                                                                                              |
| --------------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | No       | Canonical origin used for metadata, canonical tags, the sitemap, and Open Graph URLs. Falls back to the production domain when unset. |

## Architecture Overview

```
Browser
  ↓
Next.js App Router (Server Components, static rendering)
  ↓
Page composed from shared primitives + in-repo data
```

There is no server data layer. Content lives in typed files under
`components/*/…-data.ts`, and a small number of Client Components (`"use client"`)
handle the interactive pieces: header state, inline search, the contact form,
the insights filter, and scroll reveals. Everything else is a Server Component
and renders to static HTML at build time.

## Key Technical Decisions

- **Design tokens as the single source of truth.** Colour, type scale, spacing,
  radius, elevation, and motion are declared once in `app/globals.css`. The
  shadcn components inherit the palette through a semantic token bridge, so the
  brand can change without editing component files.
- **CSS for motion, not a library.** Fades, the frosted navbar, staggered
  reveals, and the timeline all run on CSS transitions/keyframes. This keeps the
  bundle smaller and lets `prefers-reduced-motion` disable everything in one
  place. Framer Motion was intentionally not added.
- **Semantic level separated from visual size.** The `Heading` primitive takes
  the heading level and the display size as independent props, so a correct
  document outline never forces a visual compromise.
- **A tailwind-merge extension.** The custom named font sizes (`text-display`,
  `text-h1`, …) are registered with `tailwind-merge` in `lib/utils.ts`; without
  it, those classes were being dropped when a colour utility was also applied.
- **Validation kept in-house.** The contact form validates with a small local
  function rather than a form library, which keeps dependencies down for a form
  of this size.

## Performance

- Every route is statically rendered
- Fonts are self‑hosted through `next/font` (no layout shift)
- Animations are limited to `transform` and `opacity`
- Client Components are used only where interaction requires them

## Accessibility

- Semantic landmarks, a skip link, and a single `<main>` element
- Keyboard‑operable mega menu and mobile drawer, with a focus trap and focus
  return on the drawer
- Form fields are labelled, and errors are associated via `aria-describedby`
  with `aria-invalid`
- Visible focus states, and `prefers-reduced-motion` honoured globally
- Colour‑contrast ratios are computed from the token values on the style‑guide
  page; one known shortfall (muted ink on the sunken surface) is documented
  there rather than hidden

## Responsive Design

Layouts are composed for each breakpoint rather than stacked. The site is built
and checked at mobile (~390px), tablet (~768px), and desktop (1440px) widths —
for example, the mega menu becomes a full‑screen drawer, and two‑column
sections reflow to text‑then‑visual.

## Deployment

A standard Next.js App Router project with no custom server or platform
configuration, so it deploys to any host that supports Next.js 16. Set
`NEXT_PUBLIC_SITE_URL` in the deployment environment so canonical URLs, the
sitemap, and Open Graph tags resolve to the production origin.

## Future Improvements

- Wire the contact form to a route handler and an email/notification service
- Add the remaining IA routes (`/firm`, `/practices`, `/engagements`) and
  individual insight article pages, then extend the sitemap
- Move insights and engagements content to a CMS once a publishing cadence is
  set
- Replace the typographic image placeholders with editorial photography
- Add a branded favicon and app‑icon set

## Contributing

```bash
git checkout -b feature/your-change
npm run lint
git commit -m "feat: describe your change"
```

Open a pull request against `main`. Keep components small and reuse the existing
primitives in `components/shared` and `components/typography`.

## License

Not currently licensed.

## Author

**Faraz Ali**

- Portfolio — https://farazali.pro
- GitHub — https://github.com/farazali-7
- Email — farazbhatti170@gmail.com
