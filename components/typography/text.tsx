import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textVariants = cva("font-sans", {
  variants: {
    /**
     * `lead` is the standfirst — the deck directly beneath a headline. It
     * bridges display and body rather than being simply "large body".
     */
    size: {
      lead: "text-lead",
      body: "text-body",
      sm: "text-body-sm",
    },
    /**
     * The palette's three ink tiers. `secondary` (#475569) is the correct
     * default for sustained prose: #0F172A at length reads heavy, and the
     * slight step back is what makes headings hold their weight.
     */
    tone: {
      default: "text-foreground",
      secondary: "text-ink-secondary",
      muted: "text-muted-foreground",
      inverted: "text-footer-foreground",
    },
    /**
     * Constrain line length. Unbounded paragraphs in a 1200px section exceed
     * 120 characters and become genuinely hard to track.
     */
    measure: {
      default: "max-w-[62ch]",
      narrow: "max-w-[48ch]",
      none: "",
    },
    balance: {
      true: "text-balance",
      false: "text-pretty",
    },
  },
  defaultVariants: {
    size: "body",
    tone: "secondary",
    measure: "default",
    balance: false,
  },
});

/**
 * Props are based on the element-agnostic `HTMLAttributes<HTMLElement>` rather
 * than `ComponentPropsWithoutRef<"p">`: the latter narrows event handlers to
 * HTMLParagraphElement, which is not assignable when rendering as `li`.
 */
export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div" | "li";
}

/**
 * Body copy, standfirsts and supporting text.
 *
 * @example
 * <Text size="lead" tone="secondary">
 *   We work with a small number of clients each year.
 * </Text>
 */
export function Text({
  as: Component = "p",
  size,
  tone,
  measure,
  balance,
  className,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(textVariants({ size, tone, measure, balance }), className)}
      {...props}
    />
  );
}
