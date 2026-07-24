import Link from "next/link";

import { Section } from "@/components/shared";
import { Eyebrow, Heading, Text } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

/**
 * Holding page for the foundation stage.
 *
 * Deliberately minimal: the homepage composition belongs to a later stage, and
 * anything designed here would have to be undone. It exists to exercise the
 * token layer and to reach the style guide.
 */
export default function HomePage() {
  return (
    <Section
      tone="canvas"
      width="editorial"
      className="flex flex-1 items-center"
      aria-labelledby="home-heading"
    >
      <div className="flex flex-col items-start gap-6">
        <Eyebrow marker tone="accent">
          {siteConfig.shortName}
        </Eyebrow>

        <Heading as="h1" size="display" id="home-heading">
          Clarity before motion
        </Heading>

        <Text size="lead">{siteConfig.description}</Text>

        <Text size="sm" tone="muted">
          The design foundation is in place. Page composition follows in the next
          stage.
        </Text>

        {/* Base UI composes via `render` rather than `asChild`. */}
        <Button render={<Link href="/style-guide" />} size="lg" className="mt-2">
          View the design system
        </Button>
      </div>
    </Section>
  );
}
