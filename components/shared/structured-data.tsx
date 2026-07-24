import { siteConfig } from "@/lib/site-config";

/**
 * Organization + WebSite JSON-LD.
 *
 * Emitted once from the root layout so every page carries it. The WebSite node
 * declares a SearchAction that mirrors the in-site search (which routes to
 * /insights), making the firm eligible for a sitelinks search box.
 *
 * Kept as a Server Component — it renders a static script with no client cost.
 */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        alternateName: siteConfig.shortName,
        url: siteConfig.url,
        description: siteConfig.description,
        sameAs: ["https://www.linkedin.com/"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        publisher: { "@id": `${siteConfig.url}/#organization` },
        inLanguage: "en",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteConfig.url}/insights?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Content is fully static and internally sourced; no user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
