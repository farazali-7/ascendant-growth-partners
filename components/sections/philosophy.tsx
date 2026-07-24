import { Reveal, Section } from "@/components/shared";
import { Heading, Text } from "@/components/typography";

const HEADING_ID = "philosophy-heading";

/**
 * Section 1 — the editorial philosophy strip.
 *
 * Its only job is to slow the visitor down. A single centred statement in the
 * display serif, a calm line of explanation beneath, no buttons and no
 * ornament — the pause between the hero's claim and the argument that follows.
 */
export function Philosophy() {
  return (
    <Section
      id="approach"
      tone="canvas"
      divider="top"
      width="editorial"
      aria-labelledby={HEADING_ID}
    >
      <Reveal className="mx-auto flex max-w-[43.75rem] flex-col items-center gap-6 text-center">
        <Heading as="h2" size="h2" id={HEADING_ID} className="text-balance">
          Organisations don&rsquo;t fail because change happens. They fail
          because they weren&rsquo;t designed to adapt.
        </Heading>
        <Text size="lead" measure="narrow">
          Ascendant Growth Partners exists for the space between strategy and
          structure — where good intentions meet the way an organisation is
          actually built to decide, and act.
        </Text>
      </Reveal>
    </Section>
  );
}
