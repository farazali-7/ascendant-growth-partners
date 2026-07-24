import { ArrowRight } from "lucide-react";

import { Reveal, Section } from "@/components/shared";
import { SectionHeading } from "./section-heading";
import { comparisonRows } from "./sections-data";

const HEADING_ID = "comparison-heading";

/**
 * Section 5 — why organisations choose AGP.
 *
 * Not "why choose us" but a side-by-side of two operating premises. The
 * traditional column is muted and settled; the AGP column is emphatic and
 * navy — the contrast carries the argument without a word of self-praise.
 */
export function Comparison() {
  return (
    <Section tone="sunken" divider="top" aria-labelledby={HEADING_ID}>
      <SectionHeading
        as="h2"
        id={HEADING_ID}
        eyebrow="Why AGP"
        title="Why organisations choose AGP."
        subtitle="The same engagement, framed two ways. The difference is what remains after we leave."
      />

      <Reveal className="mt-12">
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          {/* Column headers */}
          <div className="grid grid-cols-2 border-b border-border">
            <div className="px-5 py-4 sm:px-8">
              <span className="text-eyebrow uppercase text-muted-foreground">
                Traditional consulting
              </span>
            </div>
            <div className="border-l border-border bg-secondary/60 px-5 py-4 sm:px-8">
              <span className="text-eyebrow uppercase text-primary">
                Growth Architecture
              </span>
            </div>
          </div>

          <dl>
            {comparisonRows.map((row) => (
              <div
                key={row.agp}
                className="grid grid-cols-2 border-b border-border last:border-b-0"
              >
                <dt className="flex items-center px-5 py-6 text-body-sm text-muted-foreground sm:px-8 sm:text-body">
                  {row.traditional}
                </dt>
                <dd className="flex items-center gap-3 border-l border-border bg-secondary/60 px-5 py-6 sm:px-8">
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-primary/60"
                  />
                  <span className="font-medium text-foreground sm:text-h4">
                    {row.agp}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </Section>
  );
}
