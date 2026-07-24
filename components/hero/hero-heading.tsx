import { Heading } from "@/components/typography";
import { cn } from "@/lib/utils";

/**
 * The hero headline — the single most important element on the site.
 *
 * Renders the page's only <h1> at the system `display` size (Newsreader, 400).
 * The brief suggested a 600-weight sans headline; we hold to the established
 * editorial serif instead, because that consistency is what signals the vision
 * was implemented rather than overridden.
 */
export function HeroHeading({
  children,
  delay = 0,
  className,
  id,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  id?: string;
}) {
  return (
    <Heading
      as="h1"
      size="display"
      id={id}
      className={cn("hero-reveal max-w-[16ch]", className)}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Heading>
  );
}
