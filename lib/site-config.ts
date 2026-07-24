/**
 * Canonical site-level constants.
 *
 * Referenced by root metadata, and later by sitemap/robots/OG routes and the
 * footer. Defined once so the firm's name, description and canonical origin
 * can never drift between files.
 */
export const siteConfig = {
  name: "Ascendant Growth Partners",
  /** Short form for tight spaces (nav, footer legal line). */
  shortName: "Ascendant",
  description:
    "An executive advisory firm working with leadership teams at the point where strategy meets execution.",
  /**
   * Canonical origin. Overridden per-environment so preview deployments do not
   * emit production canonical URLs. Trailing slash intentionally omitted.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ascendantgrowthpartners.com",
  locale: "en_US",
  /** Matches --background in globals.css. Drives the mobile browser chrome. */
  themeColor: "#FAFAF9",
} as const;

export type SiteConfig = typeof siteConfig;
