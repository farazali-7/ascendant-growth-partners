import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal, Section } from "@/components/shared";
import { Heading, Text } from "@/components/typography";
import { Button } from "@/components/ui/button";

const HEADING_ID = "cta-heading";

/**
 * Section 9 — the closing invitation.
 *
 * No stock image, no gradient — a single typographic statement on the sunken
 * band, then two ways to begin. The primary action schedules a conversation;
 * the secondary keeps the more hesitant visitor reading.
 */
export function Cta() {
  return (
    <Section tone="sunken" divider="top" aria-labelledby={HEADING_ID}>
      <Reveal className="mx-auto flex max-w-[46rem] flex-col items-center gap-8 text-center">
        <Heading as="h2" size="h1" id={HEADING_ID} className="text-balance">
          The next decade won&rsquo;t reward the organisations that react
          fastest. It will reward those designed to adapt.
        </Heading>

        <Text size="lead" measure="narrow">
          Let&rsquo;s start a conversation about what your organisation needs to
          become.
        </Text>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            render={<Link href="/contact" />}
            size="lg"
            className="h-12 gap-2 px-7 text-body-sm transition-[background-color,transform,box-shadow] duration-(--dur-cta) ease-editorial hover:-translate-y-px hover:bg-(--agp-navy-hover) hover:shadow-card"
          >
            Schedule a conversation
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>

          <Button
            variant="outline"
            render={<Link href="/insights" />}
            size="lg"
            className="h-12 px-7 text-body-sm transition-colors duration-(--dur-cta) ease-editorial hover:border-border-strong"
          >
            Explore our thinking
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
