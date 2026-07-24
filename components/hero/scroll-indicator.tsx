import { cn } from "@/lib/utils";

/**
 * A quiet invitation to scroll â€” a hairline, a label, nothing that shouts.
 *
 * It is a real anchor to the section below, so it works by keyboard and does
 * something on click rather than being decorative. On hover the rule extends
 * a touch; there is no bounce or perpetual motion.
 */
export function ScrollIndicator({
  href = "#approach",
  delay = 0,
  className,
}: {
  href?: string;
  delay?: number;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "hero-reveal group/scroll inline-flex items-center gap-3 text-eyebrow uppercase text-muted-foreground transition-colors duration-(--dur-color) ease-editorial hover:text-foreground",
        className,
      )}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      <span
        aria-hidden="true"
        className="relative block h-10 w-px overflow-hidden bg-border-strong"
      >
        <span className="absolute inset-x-0 top-0 h-4 -translate-y-full bg-foreground transition-transform duration-500 ease-editorial group-hover/scroll:translate-y-10" />
      </span>
      <span>Explore</span>
    </a>
  );
}
