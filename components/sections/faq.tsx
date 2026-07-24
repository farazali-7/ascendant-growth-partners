import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, Section } from "@/components/shared";
import { SectionHeading } from "./section-heading";
import { faqItems } from "./sections-data";

const HEADING_ID = "faq-heading";

/**
 * Section 8 — the questions executives still hold.
 *
 * Uses the installed shadcn Accordion, whose smooth height transition and icon
 * rotation already match the site's motion language. A sticky heading on the
 * left keeps context while the answers open on the right.
 */
export function Faq() {
  return (
    <Section tone="canvas" divider="top" aria-labelledby={HEADING_ID}>
      <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
        <div className="self-start lg:sticky lg:top-28">
          <SectionHeading
            as="h2"
            id={HEADING_ID}
            eyebrow="Questions"
            title="What executives ask before the first conversation."
          />
        </div>

        <Reveal>
          <Accordion className="border-t border-border">
            {faqItems.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger className="py-5 text-h4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="max-w-[62ch] text-ink-secondary">
                  <p>{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  );
}
