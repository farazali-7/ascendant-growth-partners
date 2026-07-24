import { Container } from "@/components/shared";
import { Text } from "@/components/typography";

import { HeroActions } from "./hero-actions";
import { HeroBadge } from "./hero-badge";
import { HeroDescription } from "./hero-description";
import { HeroHeading } from "./hero-heading";
import { HeroVisual } from "./hero-visual";
import { ScrollIndicator } from "./scroll-indicator";

const HEADING_ID = "hero-heading";

/**
 * The hero — the section that decides whether the visitor believes the firm
 * understands strategy.
 *
 * A calm two-column editorial composition: message left, abstract visual
 * right, generous breathing room. The load is one orchestrated sequence
 * (badge → headline → standfirst → actions → visual), each piece rising on a
 * staggered delay, so the page settles rather than pops.
 *
 * The sticky header overlaps this section by design; the top padding clears
 * the bar while keeping the content optically centred.
 */
export function Hero() {
  return (
    <section
      aria-labelledby={HEADING_ID}
      className="relative overflow-hidden"
    >
      <Container className="grid min-h-svh items-center gap-x-16 gap-y-14 pt-32 pb-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:pt-36 lg:pb-28">
        {/* Message */}
        <div className="flex max-w-[42rem] flex-col items-start gap-6">
          <HeroBadge delay={120}>Strategic Growth Architecture</HeroBadge>

          <HeroHeading id={HEADING_ID} delay={200}>
            Building enterprises
            <br className="hidden sm:block" /> for an AI-defined
            <br className="hidden sm:block" /> future.
          </HeroHeading>

          <HeroDescription delay={320}>
            Ascendant Growth Partners works with leadership teams to strengthen
            enterprise readiness, accelerate AI transformation, and build
            operating models resilient enough to compound value for decades.
          </HeroDescription>

          <HeroActions delay={440} className="mt-2" />

          <Text
            size="sm"
            tone="muted"
            className="hero-reveal mt-1"
            style={{ "--reveal-delay": "540ms" } as React.CSSProperties}
          >
            A small number of engagements each year, at the level where strategy
            meets execution.
          </Text>
        </div>

        {/* Visual */}
        <HeroVisual className="mx-auto w-full max-w-[26rem] lg:mx-0 lg:max-w-none" />
      </Container>

      <ScrollIndicator
        href="#approach"
        delay={760}
        className="absolute bottom-8 left-gutter hidden lg:inline-flex"
      />
    </section>
  );
}
