import { Reveal, Section } from "@/components/shared";
import { Text } from "@/components/typography";

import { SectionHeading } from "./section-heading";
import { businessRealityBlocks, businessRealityIntro } from "./sections-data";

const HEADING_ID = "business-reality-heading";

/**
 * Section 2 — the modern business reality.
 *
 * Executives buy understanding before services, so this explains the world
 * before the firm. A sticky heading on the left holds the thesis while the
 * right column reveals four forces in sequence — numbered markers rather than
 * icons, which reads editorial instead of app-like.
 */
export function BusinessReality() {
  return (
    <Section tone="sunken" divider="top" aria-labelledby={HEADING_ID}>
      <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
        <div className="self-start lg:sticky lg:top-28">
          <SectionHeading
            as="h2"
            id={HEADING_ID}
            eyebrow="The modern business reality"
            title="The business environment has fundamentally changed."
          />
        </div>

        <div>
          <Reveal>
            <Text size="lead" measure="none" className="max-w-[52ch]">
              {businessRealityIntro}
            </Text>
          </Reveal>

          <ol className="mt-10 flex flex-col">
            {businessRealityBlocks.map((block, index) => (
              <Reveal key={block.title} delay={index * 90}>
                <li className="flex gap-6 border-t border-border py-7 first:border-t-0 first:pt-0">
                  <span
                    aria-hidden="true"
                    className="mt-1 font-mono text-body-sm tabular-nums text-muted-foreground"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-sans text-h4 text-foreground">
                      {block.title}
                    </h3>
                    <Text measure="none" className="max-w-[54ch]">
                      {block.body}
                    </Text>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
