import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal, Section } from "@/components/shared";
import { SectionHeading } from "./section-heading";
import { InsightCard } from "./insight-card";
import { insightArticles } from "./sections-data";

const HEADING_ID = "insights-heading";

/**
 * Section 6 — thought leadership, called Insights rather than Blog.
 *
 * Anticipates the firm's stated intent to publish. Three preview cards with a
 * "view all" affordance in the header.
 */
export function Insights() {
  return (
    <Section tone="canvas" divider="top" aria-labelledby={HEADING_ID}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          as="h2"
          id={HEADING_ID}
          eyebrow="Insights"
          title="Thinking on enterprise readiness and AI transformation."
        />
        <Reveal>
          <Link
            href="/insights"
            className="nav-underline inline-flex items-center gap-1.5 whitespace-nowrap text-body-sm font-medium text-foreground transition-colors duration-(--dur-color) ease-editorial hover:text-primary"
          >
            View all insights
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </Reveal>
      </div>

      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {insightArticles.map((article, index) => (
          <li key={article.href} className="flex">
            <Reveal delay={index * 90} className="flex w-full">
              <InsightCard article={article} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
