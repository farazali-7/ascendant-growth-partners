import { Reveal, Section } from "@/components/shared";
import { Text } from "@/components/typography";

import { SectionHeading } from "./section-heading";
import { principles } from "./sections-data";

const HEADING_ID = "principles-heading";

/**
 * Section 7 — strategic principles.
 *
 * Stands in for testimonials the firm does not yet have, and is stronger for
 * it: belief over borrowed praise. Pure typography, numbered, no icons.
 */
export function Principles() {
  return (
    <Section tone="sunken" divider="top" aria-labelledby={HEADING_ID}>
      <SectionHeading
        as="h2"
        id={HEADING_ID}
        eyebrow="Principles"
        title="What we hold to."
      />

      <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
        {principles.map((principle, index) => (
          <li key={principle.title} className="bg-card">
            <Reveal delay={(index % 2) * 80} className="h-full">
              <div className="flex h-full flex-col gap-3 p-7 sm:p-9">
                <span
                  aria-hidden="true"
                  className="font-mono text-body-sm tabular-nums text-muted-foreground"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-h2 text-foreground">
                  {principle.title}
                </h3>
                <Text measure="none" className="max-w-[46ch]">
                  {principle.body}
                </Text>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
