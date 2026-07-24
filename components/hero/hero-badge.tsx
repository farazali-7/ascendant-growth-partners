import { Eyebrow } from "@/components/typography";
import { cn } from "@/lib/utils";

/**
 * The hero kicker — establishes context before the headline is read.
 *
 * A thin wrapper over the system Eyebrow that adds the staggered load reveal,
 * so the hero's composition file reads as a clean sequence of timed pieces.
 */
export function HeroBadge({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <Eyebrow
      marker
      className={cn("hero-reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Eyebrow>
  );
}
