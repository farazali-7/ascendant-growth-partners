import { Reveal, Section } from "@/components/shared";
import { Text } from "@/components/typography";

import { SectionHeading } from "./section-heading";
import { methodologyStages } from "./sections-data";

const HEADING_ID = "methodology-heading";

/**
 * Section 4 — the Growth Architecture methodology.
 *
 * The firm sells a method, not hours, so this is the anchor section: a vertical
 * timeline whose connecting line draws downward as the stages settle in. Each
 * stage carries a number, a title, what happens, and the outcome it leaves
 * behind.
 */
export function Methodology() {
  return (
    <Section tone="canvas" divider="top" aria-labelledby={HEADING_ID}>
      <SectionHeading
        as="h2"
        id={HEADING_ID}
        eyebrow="Methodology"
        title="Growth Architecture, in five deliberate stages."
        subtitle="A method built to leave capability behind, not dependency."
      />

      <Reveal className="mt-14">
        <div className="relative">
          {/* The line that grows. Sits at the centre of the marker column. */}
          <span
            aria-hidden="true"
            className="timeline-line absolute bottom-6 left-[0.9375rem] top-2 w-px bg-border-strong sm:left-[1.375rem]"
          />

          <ol className="flex flex-col">
            {methodologyStages.map((stage, index) => (
              <li
                key={stage.title}
                className="relative grid grid-cols-[1.875rem_minmax(0,1fr)] gap-x-5 pb-12 last:pb-0 sm:grid-cols-[2.75rem_minmax(0,1fr)] sm:gap-x-8"
              >
                {/* Marker */}
                <div className="flex justify-center pt-1">
                  <span className="relative z-10 grid size-[1.875rem] place-items-center rounded-full bg-primary text-[0.6875rem] font-medium tabular-nums text-primary-foreground ring-4 ring-background sm:size-[2.75rem] sm:text-body-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 pb-2 pt-1.5 sm:pt-2.5">
                  <h3 className="font-display text-h3 text-foreground">
                    {stage.title}
                  </h3>
                  <Text measure="none" className="max-w-[56ch]">
                    {stage.body}
                  </Text>
                  <p className="mt-1 flex items-baseline gap-2 text-body-sm">
                    <span className="text-eyebrow uppercase text-muted-foreground">
                      Outcome
                    </span>
                    <span className="text-ink-secondary">{stage.outcome}</span>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </Section>
  );
}
