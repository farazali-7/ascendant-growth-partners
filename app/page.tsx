import { Hero } from "@/components/hero";
import { Section } from "@/components/shared";
import { Eyebrow, Heading, Text } from "@/components/typography";

/**
 * Home. The hero is followed by a quiet transition — a hairline divider into a
 * philosophy statement — so the page reads with a magazine's flow rather than
 * stopping abruptly. Later stages continue from the `#approach` anchor.
 */
export default function HomePage() {
  return (
    <>
      <Hero />

      <Section
        id="approach"
        tone="canvas"
        divider="top"
        width="editorial"
        aria-labelledby="philosophy-heading"
      >
        <div className="flex flex-col items-start gap-6">
          <Eyebrow marker>Our philosophy</Eyebrow>
          <Heading as="h2" size="h2" id="philosophy-heading">
            We don&rsquo;t reinvent what works. We implement it.
          </Heading>
          <Text size="lead">
            The difference between advice and outcome is discipline. We join a
            small number of leadership teams each year and stay close to the
            work — translating strategy into operating decisions, and operating
            decisions into durable results.
          </Text>
        </div>
      </Section>
    </>
  );
}
