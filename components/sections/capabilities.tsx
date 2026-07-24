import { Reveal, Section } from "@/components/shared";

import { CapabilityCard } from "./capability-card";
import { SectionHeading } from "./section-heading";
import { capabilities } from "./sections-data";

const HEADING_ID = "capabilities-heading";

/**
 * Section 3 — core capabilities.
 *
 * Answers "what exactly do they do?" with a restrained card grid. Cards reveal
 * on a short per-item stagger so the grid assembles rather than snaps.
 */
export function Capabilities() {
  return (
    <Section tone="canvas" divider="top" aria-labelledby={HEADING_ID}>
      <SectionHeading
        as="h2"
        id={HEADING_ID}
        eyebrow="Capabilities"
        title="Helping organisations prepare for what comes next."
      />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((capability, index) => (
          <li key={capability.title} className="flex">
            <Reveal delay={(index % 3) * 80} className="flex w-full">
              <CapabilityCard capability={capability} index={index} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
