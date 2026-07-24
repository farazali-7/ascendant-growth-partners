import type { InsightArticle } from "@/components/sections/sections-data";

/**
 * The insights catalogue. A superset of the three previews shown on the home
 * page, kept here so the Insights page can stand alone as a publication.
 */
export const allInsights: InsightArticle[] = [
  {
    title: "Why transformation programmes stall in the second year",
    category: "Organisational Design",
    date: "June 2026",
    readingTime: "8 min read",
    href: "/insights/transformation-second-year",
  },
  {
    title: "AI is an operating-model decision, not a technology one",
    category: "AI Transformation",
    date: "May 2026",
    readingTime: "6 min read",
    href: "/insights/ai-operating-model",
  },
  {
    title: "Designing enterprises that hold under more than one future",
    category: "Strategy",
    date: "April 2026",
    readingTime: "10 min read",
    href: "/insights/designing-for-many-futures",
  },
  {
    title: "The board's role when the operating model is the strategy",
    category: "Governance",
    date: "March 2026",
    readingTime: "7 min read",
    href: "/insights/board-and-operating-model",
  },
  {
    title: "Where enterprise value quietly leaks — and how to find it",
    category: "Strategy",
    date: "February 2026",
    readingTime: "9 min read",
    href: "/insights/value-leakage",
  },
  {
    title: "Integration is a design problem, not a checklist",
    category: "Transactions",
    date: "January 2026",
    readingTime: "6 min read",
    href: "/insights/integration-as-design",
  },
  {
    title: "Decision rights: the most under-designed asset in the enterprise",
    category: "Organisational Design",
    date: "December 2025",
    readingTime: "8 min read",
    href: "/insights/decision-rights",
  },
  {
    title: "Reading an organisation before you advise it",
    category: "AI Transformation",
    date: "November 2025",
    readingTime: "5 min read",
    href: "/insights/reading-an-organisation",
  },
  {
    title: "Resilience is an architecture, not a culture initiative",
    category: "Strategy",
    date: "October 2025",
    readingTime: "7 min read",
    href: "/insights/resilience-architecture",
  },
];

/** Filter options; "All" is the default view. */
export const insightCategories = [
  "All",
  "Strategy",
  "AI Transformation",
  "Organisational Design",
  "Governance",
  "Transactions",
] as const;

export type InsightCategory = (typeof insightCategories)[number];
