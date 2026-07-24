import type { Metadata } from "next";

import { Container, Section } from "@/components/shared";
import { Eyebrow, Heading, Text } from "@/components/typography";

import { ColorSwatch } from "./_components/color-swatch";
import { ComponentCheck } from "./_components/component-check";
import { GuideSection } from "./_components/guide-section";
import { ScaleTable } from "./_components/scale-table";
import {
  colorGroups,
  elevationTokens,
  measureTokens,
  radiusTokens,
  spacingTokens,
  typeSpecimens,
} from "./_lib/tokens";

export const metadata: Metadata = {
  title: "Design System",
  description:
    "Internal reference for the Executive Slate design foundation: colour, typography, spacing, elevation and motion tokens.",
  // Internal tooling — must never reach the index or appear in sitemaps.
  robots: { index: false, follow: false },
};

/**
 * Static class maps for the preview column. Declared as literals so Tailwind
 * can extract them; see ScaleTable's `previews` documentation.
 */
const elevationPreviews: Record<string, string> = {
  subtle: "rounded-xl shadow-subtle",
  card: "rounded-xl shadow-card",
  lifted: "rounded-xl shadow-lifted",
  overlay: "rounded-xl shadow-overlay",
};

const radiusPreviews: Record<string, string> = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
};

export default function StyleGuidePage() {
  return (
    <>
      {/* Masthead */}
      <Section tone="canvas" spacing="compact" divider="bottom" aria-labelledby="guide-title">
        <div className="flex flex-col gap-5">
          <Eyebrow marker tone="accent">
            Internal reference
          </Eyebrow>
          <Heading as="h1" size="display" id="guide-title">
            Executive Slate
          </Heading>
          <Text size="lead" measure="default">
            The design foundation every subsequent stage compiles against. Colour,
            typography, spatial rhythm, elevation and motion are fixed here so no
            later stage has to invent them.
          </Text>
          <Text size="sm" tone="muted">
            Contrast ratios below are computed from the live token values, not
            recorded by hand.
          </Text>
        </div>
      </Section>

      <GuideSection
        id="colour"
        eyebrow="01"
        title="Colour"
        description="A warm near-white ground, three tiers of ink, and a single navy used sparingly enough that it still reads as authority."
        tone="canvas"
      >
        <div className="flex flex-col gap-14">
          {colorGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Heading as="h3" size="h3">
                  {group.title}
                </Heading>
                <Text size="body" measure="default">
                  {group.description}
                </Text>
              </div>
              {/* Two columns until xl: each swatch now carries up to three
                  contrast badges plus a possible caveat. */}
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {group.tokens.map((token) => (
                  <ColorSwatch key={token.variable} token={token} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </GuideSection>

      <GuideSection
        id="typography"
        eyebrow="02"
        title="Typography"
        description="Newsreader for display, Public Sans for everything functional. Display weights stay at 400 — heavy serif headlines read promotional rather than editorial."
        tone="sunken"
        divider="top"
      >
        <div className="flex flex-col divide-y">
          {typeSpecimens.map((specimen) => (
            <div
              key={specimen.token}
              className="grid gap-4 py-8 first:pt-0 last:pb-0 lg:grid-cols-[14rem_1fr] lg:gap-10"
            >
              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-h4 text-foreground">
                  {specimen.label}
                </span>
                <code className="font-mono text-[0.6875rem] text-muted-foreground">
                  {specimen.token}
                </code>
                <span className="font-sans text-body-sm text-muted-foreground">
                  {specimen.notes}
                </span>
              </div>
              {/*
                Specimens are presentational text, not document structure, so
                they render as <p> — promoting them to headings would inject
                phantom levels into this page's outline.
              */}
              <p className={specimen.className}>{specimen.sample}</p>
            </div>
          ))}
        </div>
      </GuideSection>

      <GuideSection
        id="space"
        eyebrow="03"
        title="Space and measure"
        description="Fluid rhythm tokens. Because every section resolves the same gutter, page content aligns down a single left edge at every breakpoint."
        tone="canvas"
      >
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-5">
            <Heading as="h3" size="h3">
              Rhythm
            </Heading>
            <ScaleTable tokens={spacingTokens} caption="Spacing scale tokens" />
          </div>
          <div className="flex flex-col gap-5">
            <Heading as="h3" size="h3">
              Measure
            </Heading>
            <ScaleTable tokens={measureTokens} caption="Container measure tokens" />
          </div>
        </div>
      </GuideSection>

      <GuideSection
        id="surface"
        eyebrow="04"
        title="Elevation and radius"
        description="Shadows are close to invisible by design. Structure is carried by borders and surface value; shadow is reserved for layers that genuinely float."
        tone="sunken"
        divider="top"
      >
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-5">
            <Heading as="h3" size="h3">
              Elevation
            </Heading>
            <ScaleTable
              tokens={elevationTokens}
              caption="Elevation tokens"
              previews={elevationPreviews}
            />
          </div>
          <div className="flex flex-col gap-5">
            <Heading as="h3" size="h3">
              Radius
            </Heading>
            <Text measure="default">
              A 4px base, down from the scaffold&rsquo;s 10px. Softer corners read
              consumer; this system wants crisp ones.
            </Text>
            <ScaleTable
              tokens={radiusTokens}
              caption="Border radius tokens"
              previews={radiusPreviews}
            />
          </div>
        </div>
      </GuideSection>

      <GuideSection
        id="motion"
        eyebrow="05"
        title="Motion"
        description="Three durations and one curve. Animation should register as responsiveness rather than as an effect."
        tone="canvas"
      >
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              duration: "150ms",
              utility: "duration-150",
              usage: "Micro-interactions. Hover, focus, colour shifts.",
            },
            {
              duration: "250ms",
              utility: "duration-250",
              usage: "Standard. Disclosure, state transitions.",
            },
            {
              duration: "400ms",
              utility: "duration-400",
              usage: "Entrance. Scroll reveals and first paint.",
            },
          ].map((item) => (
            <div
              key={item.utility}
              className="flex flex-col gap-3 rounded-xl border bg-card p-5"
            >
              <span className="font-display text-h3 text-foreground">
                {item.duration}
              </span>
              <code className="w-fit rounded-sm bg-secondary px-2 py-1 font-mono text-[0.6875rem] leading-none text-ink-secondary">
                {item.utility}
              </code>
              <Text size="sm" tone="muted" measure="none">
                {item.usage}
              </Text>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border bg-card p-5">
          <Text size="sm" measure="none">
            Paired with{" "}
            <code className="rounded-sm bg-secondary px-1.5 py-0.5 font-mono text-[0.6875rem] text-ink-secondary">
              ease-editorial
            </code>{" "}
            — <code className="font-mono text-[0.6875rem]">cubic-bezier(0.22, 1, 0.36, 1)</code>,
            a decelerating curve with no overshoot. All motion is suppressed
            globally under <code className="font-mono text-[0.6875rem]">prefers-reduced-motion</code>.
          </Text>
        </div>
      </GuideSection>

      <GuideSection
        id="components"
        eyebrow="06"
        title="Component inheritance"
        description="These shadcn components have not been modified. They pick up Executive Slate entirely through the semantic token bridge — which is the test of whether that bridge is correct."
        tone="sunken"
        divider="top"
      >
        <ComponentCheck />
      </GuideSection>

      {/* Inverted zone — verifies the footer palette in context. */}
      <Section tone="inverted" spacing="compact" aria-labelledby="inverted-heading">
        <div className="flex flex-col gap-4">
          <Eyebrow tone="inverted" marker>
            07
          </Eyebrow>
          <Heading as="h2" size="h2" tone="inverted" id="inverted-heading">
            Inverted zone
          </Heading>
          <Text tone="inverted" measure="default">
            The footer is the only large dark surface in the system. Footer ink on
            footer surface measures 12.02:1 — comfortably AAA, which matters because
            legal and contact copy is often the smallest text on the site.
          </Text>
        </div>
      </Section>

      <Container as="footer" className="py-10">
        <Text size="sm" tone="muted">
          Internal design reference. Not indexed, not linked from the public site.
        </Text>
      </Container>
    </>
  );
}
