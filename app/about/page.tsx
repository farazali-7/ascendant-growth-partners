import type { Metadata } from "next";

import { Principles, Cta } from "@/components/sections";
import { PageHeader, Reveal, Section } from "@/components/shared";
import { Eyebrow, Heading, Text } from "@/components/typography";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ascendant Growth Partners is an executive advisory firm that builds the operating architecture organisations need to adapt. Our mission, philosophy and principles.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About — ${siteConfig.name}`,
    description:
      "Perspective over history — how Ascendant Growth Partners thinks about building adaptable enterprises.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Perspective over history."
        lead="What matters is not how long we have existed, but how we think — and what we leave behind in the organisations we work with."
      />

      {/* Mission */}
      <Section tone="canvas" width="editorial" aria-labelledby="mission-heading">
        <Reveal className="flex flex-col gap-6">
          <Eyebrow marker>Mission</Eyebrow>
          <Heading as="h2" size="h2" id="mission-heading">
            To make organisations adaptable — by design, not by chance.
          </Heading>
          <Text size="lead">
            We build the operating architecture that lets leadership teams keep
            making good decisions as markets, technology and competition move
            beneath them. The measure of our work is capability that remains
            after we have gone.
          </Text>
        </Reveal>
      </Section>

      {/* Philosophy */}
      <Section
        tone="sunken"
        divider="top"
        aria-labelledby="about-philosophy-heading"
      >
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
          <div className="self-start lg:sticky lg:top-28">
            <Reveal className="flex flex-col gap-4">
              <Eyebrow marker>Philosophy</Eyebrow>
              <Heading as="h2" size="h2" id="about-philosophy-heading">
                We implement the vision rather than overpower it.
              </Heading>
            </Reveal>
          </div>
          <Reveal className="flex flex-col gap-6">
            <Text size="lead" measure="none" className="max-w-[54ch]">
              Advice is easy to give and easy to ignore. The difference between
              advice and outcome is discipline — staying close to the work until
              a strategy becomes the way an organisation actually operates.
            </Text>
            <Text measure="none" className="max-w-[60ch]">
              We take on a small number of engagements each year, at the level
              where strategy meets execution. That constraint is deliberate: the
              model depends on partner attention rather than leverage, and on
              understanding an organisation deeply enough to change how it
              decides — not just what it decides.
            </Text>
            <Text measure="none" className="max-w-[60ch]">
              We do not reinvent what already works. We find the few structural
              constraints that govern performance, and we redesign around them
              with the restraint the stakes deserve.
            </Text>
          </Reveal>
        </div>
      </Section>

      {/* Principles (shared with the home page) */}
      <Principles />

      {/* Closing invitation (shared with the home page) */}
      <Cta />
    </>
  );
}
