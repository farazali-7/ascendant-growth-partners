import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const eyebrowVariants = cva(
  // Uppercasing is done in CSS, never in the source string — see component doc.
  "inline-flex items-center font-sans text-eyebrow uppercase",
  {
    variants: {
      tone: {
        default: "text-muted-foreground",
        accent: "text-primary",
        inverted: "text-footer-foreground",
      },
      /** Short leading rule. Editorial punctuation, used sparingly. */
      marker: {
        true: "gap-3 before:h-px before:w-8 before:bg-current before:opacity-40 before:content-['']",
        false: "",
      },
    },
    defaultVariants: {
      tone: "default",
      marker: false,
    },
  },
);

/** Element-agnostic base — see the note in `text.tsx` for why. */
export interface EyebrowProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof eyebrowVariants> {
  /** Render as <span> when nested inside another block element. */
  as?: "p" | "span" | "div";
}

/**
 * Kicker / label above a heading.
 *
 * Write children in sentence case — capitalisation is applied with CSS
 * `text-transform`. Several screen readers announce literal all-caps strings
 * letter by letter, so the accessible name must stay in normal case.
 *
 * This is never a heading element: it labels the heading below it, and
 * promoting it to one would insert a phantom level into the document outline.
 *
 * @example
 * <Eyebrow marker>Our approach</Eyebrow>
 * <Heading as="h2" size="h2">Clarity before motion</Heading>
 */
export function Eyebrow({
  as: Component = "p",
  tone,
  marker,
  className,
  ...props
}: EyebrowProps) {
  return (
    <Component
      className={cn(eyebrowVariants({ tone, marker }), className)}
      {...props}
    />
  );
}
