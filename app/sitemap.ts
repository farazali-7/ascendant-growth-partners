import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

/**
 * Sitemap. Lists only routes that currently exist — deliberately omitting the
 * IA stubs (/firm, /practices, /engagements) until those pages are built, since
 * listing URLs that 404 is worse for SEO than omitting them. Extend this as
 * pages ship.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: Array<{ path: string; priority: number }> = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/insights", priority: 0.8 },
    { path: "/contact", priority: 0.7 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
