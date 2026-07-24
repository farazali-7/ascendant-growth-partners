/**
 * Palette data rendered by the style guide.
 *
 * NOTE: `app/globals.css` is the single source of truth. This file mirrors it
 * for display and contrast verification only. Parsing the stylesheet at build
 * time would remove the duplication, but adds a build step that is not worth
 * it for an internal QA page — so the coupling is documented instead. If you
 * change a primitive in globals.css, change it here too.
 */

export interface ContrastTarget {
  label: string;
  hex: string;
}

export interface ColorToken {
  /** CSS custom property, without the leading `--`. */
  variable: string;
  hex: string;
  label: string;
  usage: string;
  /**
   * Every surface this token can legitimately be read against — not just its
   * most flattering one.
   *
   * Grading ink against the canvas alone hid a real failure: #64748B clears AA
   * on #FAFAF9 (4.56:1) but not on the #F5F5F4 section band (4.36:1). Listing
   * all surfaces makes the worst case impossible to miss.
   */
  against?: ContrastTarget[];
  /** Skip contrast grading for non-text tokens (surfaces, hairlines). */
  decorative?: boolean;
  /** Known, accepted shortfall — rendered as an explicit caveat on the swatch. */
  caveat?: string;
}

export interface ColorGroup {
  title: string;
  description: string;
  tokens: ColorToken[];
}

const CANVAS = "#FAFAF9";
const SURFACE = "#FFFFFF";
const SUNKEN = "#F5F5F4";
const INVERTED = "#0F172A";

/** The three light surfaces any ink token may land on. */
const LIGHT_SURFACES: ContrastTarget[] = [
  { label: "Canvas", hex: CANVAS },
  { label: "Sunken", hex: SUNKEN },
  { label: "White", hex: SURFACE },
];

export const colorGroups: ColorGroup[] = [
  {
    title: "Surfaces",
    description:
      "Three near-white values. The separation between them is deliberately slight — it reads as depth rather than as blocks of colour.",
    tokens: [
      {
        variable: "agp-canvas",
        hex: CANVAS,
        label: "Canvas",
        usage: "Page background. Warm off-white, never pure.",
        decorative: true,
      },
      {
        variable: "agp-surface",
        hex: SURFACE,
        label: "Surface",
        usage: "Cards. Advances against the warm canvas without a shadow.",
        decorative: true,
      },
      {
        variable: "agp-surface-sunken",
        hex: SUNKEN,
        label: "Sunken",
        usage: "Alternating section bands.",
        decorative: true,
      },
    ],
  },
  {
    title: "Ink",
    description:
      "Three tiers of hierarchy. Most pages should carry their structure through these rather than through changes in size. Each is graded against all three light surfaces — the lowest result is the one that governs.",
    tokens: [
      {
        variable: "agp-ink",
        hex: INVERTED,
        label: "Primary",
        usage: "Headings and emphatic copy. Softened near-black.",
        against: LIGHT_SURFACES,
      },
      {
        variable: "agp-ink-secondary",
        hex: "#475569",
        label: "Secondary",
        usage: "Body copy at length.",
        against: LIGHT_SURFACES,
      },
      {
        variable: "agp-ink-muted",
        hex: "#64748B",
        label: "Muted",
        usage: "Metadata, captions, eyebrow labels.",
        against: LIGHT_SURFACES,
        caveat:
          "Falls to 4.36:1 on the sunken band — below AA for text under 24px. Restrict to 24px+ there, or darken the token to #616E85, which clears AA on all three surfaces.",
      },
    ],
  },
  {
    title: "Structure",
    description:
      "Borders carry the structural load in place of shadow. Both values are decorative by WCAG's definition — they never encode meaning on their own.",
    tokens: [
      {
        variable: "agp-line",
        hex: "#E5E7EB",
        label: "Line",
        usage: "Resting borders, dividers, card edges.",
        decorative: true,
      },
      {
        variable: "agp-line-strong",
        hex: "#CBD5E1",
        label: "Line strong",
        usage: "Hover and active borders.",
        decorative: true,
      },
    ],
  },
  {
    title: "Brand",
    description:
      "Navy appears rarely. Its scarcity is what makes it read as authority rather than decoration.",
    tokens: [
      {
        variable: "agp-navy",
        hex: "#16324F",
        label: "Navy",
        usage: "Primary actions, focus ring, accent rules.",
        against: LIGHT_SURFACES,
      },
      {
        variable: "agp-navy-hover",
        hex: "#10253B",
        label: "Navy hover",
        usage: "Pressed and hovered primary actions.",
        against: LIGHT_SURFACES,
      },
    ],
  },
  {
    title: "Status",
    description:
      "Desaturated to sit inside the palette rather than interrupt it. Both are measured against white, the surface they appear on.",
    tokens: [
      {
        variable: "agp-success",
        hex: "#2F6F4F",
        label: "Success",
        usage: "Confirmation states.",
        against: LIGHT_SURFACES,
      },
      {
        variable: "agp-critical",
        hex: "#9B2C2C",
        label: "Critical",
        usage: "Form and destructive states. Added to satisfy shadcn's contract.",
        against: LIGHT_SURFACES,
      },
    ],
  },
  {
    title: "Inverted",
    description: "The footer zone — the only large dark surface in the system.",
    tokens: [
      {
        variable: "agp-inverted-surface",
        hex: INVERTED,
        label: "Footer surface",
        usage: "Footer background.",
        decorative: true,
      },
      {
        variable: "agp-inverted-ink",
        hex: "#CBD5E1",
        label: "Footer ink",
        usage: "Footer body copy and links.",
        against: [{ label: "Footer", hex: INVERTED }],
      },
    ],
  },
];

export interface TypeSpecimen {
  token: string;
  label: string;
  sample: string;
  className: string;
  notes: string;
}

export const typeSpecimens: TypeSpecimen[] = [
  {
    token: "text-display",
    label: "Display",
    sample: "Clarity before motion",
    className: "font-display text-display",
    notes: "Newsreader 400 · fluid 44→84px · tracking −0.028em",
  },
  {
    token: "text-h1",
    label: "Heading 1",
    sample: "Advising leadership through consequential decisions",
    className: "font-display text-h1",
    notes: "Newsreader 400 · fluid 36→56px",
  },
  {
    token: "text-h2",
    label: "Heading 2",
    sample: "Where strategy meets execution",
    className: "font-display text-h2",
    notes: "Newsreader 400 · fluid 28→40px",
  },
  {
    token: "text-h3",
    label: "Heading 3",
    sample: "Operating partnership",
    className: "font-sans text-h3",
    notes: "Public Sans 500 · fluid 20→24px",
  },
  {
    token: "text-h4",
    label: "Heading 4",
    sample: "Engagement structure",
    className: "font-sans text-h4",
    notes: "Public Sans 500 · 17px",
  },
  {
    token: "text-lead",
    label: "Lead",
    sample:
      "We work with a small number of clients each year, at the level where strategy meets execution.",
    className: "font-sans text-lead text-ink-secondary",
    notes: "Public Sans 400 · fluid 18→21px · standfirst",
  },
  {
    token: "text-body",
    label: "Body",
    sample:
      "Our work begins before the mandate is written. We spend the first weeks understanding how decisions actually get made inside an organisation — who is consulted, what is assumed, and where the real constraints sit.",
    className: "font-sans text-body text-ink-secondary",
    notes: "Public Sans 400 · 16px · 1.7 leading",
  },
  {
    token: "text-body-sm",
    label: "Body small",
    sample: "Engagements typically run between nine and eighteen months.",
    className: "font-sans text-body-sm text-muted-foreground",
    notes: "Public Sans 400 · 14px",
  },
  {
    token: "text-eyebrow",
    label: "Eyebrow",
    sample: "Our approach",
    className: "font-sans text-eyebrow uppercase text-muted-foreground",
    notes: "Public Sans 500 · 12px · tracking 0.14em",
  },
];

export interface ScaleToken {
  name: string;
  utility: string;
  value: string;
  usage: string;
}

export const spacingTokens: ScaleToken[] = [
  {
    name: "gutter",
    utility: "px-gutter",
    value: "clamp(1.25rem, 0.7rem + 2.6vw, 2.5rem)",
    usage: "Page gutter. Every section aligns to this edge.",
  },
  {
    name: "section",
    utility: "py-section",
    value: "clamp(4.5rem, 3rem + 6vw, 8.5rem)",
    usage: "Standard vertical rhythm between bands.",
  },
  {
    name: "section-sm",
    utility: "py-section-sm",
    value: "clamp(3rem, 2.1rem + 3.6vw, 5.5rem)",
    usage: "Compact bands and transitional sections.",
  },
];

export const measureTokens: ScaleToken[] = [
  {
    name: "editorial",
    utility: "max-w-editorial",
    value: "44rem",
    usage: "Long-form prose. Around 68 characters.",
  },
  {
    name: "content",
    utility: "max-w-content",
    value: "75rem",
    usage: "Default section measure.",
  },
  {
    name: "wide",
    utility: "max-w-wide",
    value: "90rem",
    usage: "Full-bleed compositions.",
  },
];

export const elevationTokens: ScaleToken[] = [
  {
    name: "subtle",
    utility: "shadow-subtle",
    value: "0 1px 2px · 5%",
    usage: "Resting inputs and low-emphasis surfaces.",
  },
  {
    name: "card",
    utility: "shadow-card",
    value: "0 8px 24px −14px · 12%",
    usage: "Cards that need to lift off the canvas.",
  },
  {
    name: "lifted",
    utility: "shadow-lifted",
    value: "0 14px 34px −16px · 16%",
    usage: "Hover state for interactive cards.",
  },
  {
    name: "overlay",
    utility: "shadow-overlay",
    value: "0 24px 60px −20px · 24%",
    usage: "Menus, dialogs and popovers only.",
  },
];

export const radiusTokens: ScaleToken[] = [
  { name: "sm", utility: "rounded-sm", value: "2px", usage: "Badges, tags." },
  { name: "md", utility: "rounded-md", value: "3px", usage: "Inputs, small controls." },
  { name: "lg", utility: "rounded-lg", value: "4px", usage: "Buttons. The system default." },
  { name: "xl", utility: "rounded-xl", value: "6px", usage: "Cards, panels." },
  { name: "2xl", utility: "rounded-2xl", value: "8px", usage: "Large feature surfaces." },
];
