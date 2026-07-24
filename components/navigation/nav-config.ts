/**
 * Information architecture for the primary navigation.
 *
 * Data-driven so the header markup never hard-codes a label or href, and so a
 * later stage can extend the mega menu (or add items) without touching the
 * motion or layout code.
 *
 * Routes point at the eventual site structure; the pages themselves are built
 * in later stages, so following a link before then will 404. That is expected
 * for a staged build.
 */

export interface NavLeafItem {
  label: string;
  href: string;
  /** One-line gloss shown in the mega menu. */
  description?: string;
}

export interface NavColumn {
  heading: string;
  items: NavLeafItem[];
}

export interface NavItem {
  label: string;
  href: string;
  /** Presence of `columns` promotes this item to a mega-menu trigger. */
  columns?: NavColumn[];
  /** Editorial promo shown alongside the columns. */
  feature?: {
    eyebrow: string;
    title: string;
    href: string;
    cta: string;
  };
}

export const primaryNav: NavItem[] = [
  {
    label: "Firm",
    href: "/firm",
  },
  {
    label: "Practices",
    href: "/practices",
    columns: [
      {
        heading: "Advisory",
        items: [
          {
            label: "Corporate Strategy",
            href: "/practices/corporate-strategy",
            description: "Direction-setting for boards and executive teams.",
          },
          {
            label: "Board & Governance",
            href: "/practices/board-governance",
            description: "Counsel on succession, structure and oversight.",
          },
          {
            label: "Operating Partnership",
            href: "/practices/operating-partnership",
            description: "Embedded support through periods of change.",
          },
        ],
      },
      {
        heading: "Transactions",
        items: [
          {
            label: "Mergers & Acquisitions",
            href: "/practices/mergers-acquisitions",
            description: "Advice from thesis through to close.",
          },
          {
            label: "Diligence & Value Creation",
            href: "/practices/diligence-value-creation",
            description: "Where value is made, and quietly lost.",
          },
          {
            label: "Post-Merger Integration",
            href: "/practices/integration",
            description: "The first hundred days, done deliberately.",
          },
        ],
      },
    ],
    feature: {
      eyebrow: "Featured engagement",
      title: "A board-level turnaround, eighteen months in the making.",
      href: "/engagements/turnaround",
      cta: "Read the engagement",
    },
  },
  {
    label: "Insights",
    href: "/insights",
  },
  {
    label: "Engagements",
    href: "/engagements",
  },
];

export const primaryCta = {
  label: "Arrange a consultation",
  href: "/contact",
} as const;
