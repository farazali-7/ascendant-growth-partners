# Implementation Notes

A short account of how I approached the brief and why the site is built the way
it is.

## Objective

I read the brief as an *implementation partnership*, not a redesign. The task
was to take the strategic direction — editorial, premium, minimal, calm,
intelligent, timeless — and elevate the execution: typography, spacing,
hierarchy, responsiveness and interaction quality, while preserving the vision.
So the work is deliberately restrained. The craft is meant to show in the
details, not in novelty.

## Design decisions

- **Typography.** Newsreader (a screen‑native editorial serif) for display,
  Public Sans (an institutional grotesque) for body — chosen specifically to
  avoid framework‑default fonts. Display weights stay at 400; heavy serif
  headlines read promotional rather than editorial.
- **Palette.** A warm off‑white canvas (`#FAFAF9`) over white cards, three tiers
  of slate ink, and a single deep navy used sparingly. Its scarcity is what
  makes it read as authority rather than decoration.
- **Radius.** A crisp 4px system. Rounded corners read consumer/SaaS; near‑square
  corners read "law firm", which is truer to the brief. Consistency across every
  button, card and input was the real goal.
- **Spacing & rhythm.** Fluid `clamp()` tokens for section rhythm and page
  gutter, so every section aligns to one left edge and scale is continuous
  between breakpoints rather than snapping.
- **Motion.** One page‑load sequence and a small, consistent interaction
  language (cards lift 2px + border darkens + arrow advances; centre‑out link
  underlines; a frosted, shrinking navbar). Three durations, one ease. All of it
  is suppressed under `prefers-reduced-motion`.
- **Responsiveness.** Layouts are recomposed per breakpoint, not stacked — the
  mega menu becomes a full‑screen drawer, two‑column sections become text‑then‑
  visual, and the comparison holds its contrast even at 390px.

## Technical decisions

- **Server Components by default;** `"use client"` only where interaction
  demands it (header state, search, form, filter, scroll reveal). Every route
  renders statically.
- **Design tokens as the contract.** shadcn/Base UI components inherit the brand
  through a semantic token bridge with zero component edits — verified on the
  internal `/style-guide`.
- **No unnecessary libraries.** Motion is CSS; validation is hand‑rolled. Smaller
  bundle, and reduced‑motion support comes for free.
- **Accessibility.** Semantic landmarks, a skip link, keyboard‑operable menus and
  drawer (focus trap + return), form errors wired via `aria-describedby`, and
  colour contrast computed from live token values (one known trade‑off — muted
  ink on the sunken band — is documented, not hidden).
- **SEO & production.** Per‑page metadata and canonicals, a generated OG image,
  `robots`, `sitemap`, and Organization/WebSite JSON‑LD.

## Future expansion

The architecture is built to scale from a handful of pages to dozens: content
lives in data files (ready to swap for a CMS), sections are self‑contained and
reorderable, and new pages compose existing primitives (`PageHeader`,
`Section`, `Reveal`, typography, cards). Adding a thought‑leadership article
type, or an engagements/case‑study collection, is additive rather than
structural.

## Questions for the next iteration

1. **Content workflow** — is a CMS (and which) part of the plan for insights and
   engagements, or should content stay in‑repo for now? It affects how I model
   the data layer next.
2. **Publishing cadence** — how often will thought‑leadership ship? That informs
   whether we invest in categories, tags, author profiles and RSS now.
3. **Brand assets** — do you have final logo, editorial photography and social
   imagery? I've used typographic placeholders where photography will live, and
   can swap them in without layout change.
