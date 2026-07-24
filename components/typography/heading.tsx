import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const headingVariants = cva("text-balance", {
  variants: {
    /**
     * Visual size, independent of semantic level.
     *
     * Display sizes use the serif at weight 400 — heavy serif headlines read
     * promotional rather than editorial. Subsection sizes switch to the
     * grotesque, which holds structure better at small sizes.
     */
    size: {
      display: "font-display text-display",
      h1: "font-display text-h1",
      h2: "font-display text-h2",
      h3: "font-sans text-h3",
      h4: "font-sans text-h4",
    },
    tone: {
      default: "text-foreground",
      secondary: "text-ink-secondary",
      muted: "text-muted-foreground",
      accent: "text-primary",
      inverted: "text-footer-foreground",
    },
  },
  defaultVariants: {
    size: "h2",
    tone: "default",
  },
});

export interface HeadingProps
  extends Omit<React.ComponentPropsWithoutRef<"h2">, "color">,
    VariantProps<typeof headingVariants> {
  /**
   * Semantic heading level. Drives the document outline only — never appearance.
   * Choose this from the page's structure, then choose `size` from the design.
   */
  as?: HeadingLevel;
}

/**
 * Section and page headings.
 *
 * Semantic level (`as`) and visual size (`size`) are intentionally separate so
 * a correct document outline never forces a visual compromise.
 *
 * @example A visually small heading that is still the section's h2
 * <Heading as="h2" size="h4" id="engagements-heading">Engagements</Heading>
 */
export function Heading({
  as: Component = "h2",
  size,
  tone,
  className,
  ...props
}: HeadingProps) {
  return (
    <Component
      className={cn(headingVariants({ size, tone }), className)}
      {...props}
    />
  );
}
