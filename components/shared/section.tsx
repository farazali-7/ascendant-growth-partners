import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Container, type ContainerProps } from "./container";

const sectionVariants = cva("w-full", {
  variants: {
    /**
     * Surface value. Alternating `canvas` and `sunken` is what creates page
     * structure in a system that uses almost no shadow.
     */
    tone: {
      canvas: "bg-background text-foreground",
      sunken: "bg-secondary text-foreground",
      surface: "bg-card text-card-foreground",
      inverted: "bg-footer text-footer-foreground",
    },
    /** Vertical rhythm. `flush` is for sections managing their own padding. */
    spacing: {
      default: "py-section",
      compact: "py-section-sm",
      flush: "",
    },
    /**
     * Hairline separator. Preferred over shadow for delineating same-tone
     * sections, consistent with the palette's border-led structure.
     */
    divider: {
      none: "",
      top: "border-t",
      bottom: "border-b",
    },
  },
  defaultVariants: {
    tone: "canvas",
    spacing: "default",
    divider: "none",
  },
});

export interface SectionProps
  extends React.ComponentPropsWithoutRef<"section">,
    VariantProps<typeof sectionVariants> {
  /** Measure applied to the inner container. */
  width?: ContainerProps["width"];
  /**
   * Render without the inner Container when a child composition needs to
   * bleed to the viewport edge and manage its own measure.
   */
  bleed?: boolean;
}

/**
 * A full-bleed band with a constrained inner measure.
 *
 * Accessibility: a <section> is only exposed as a `region` landmark when it
 * has an accessible name. Always pass `aria-labelledby` pointing at the
 * section's heading id (or `aria-label` where the section has no visible
 * heading), otherwise it conveys nothing to assistive technology.
 *
 * @example
 * <Section tone="sunken" aria-labelledby="approach-heading">
 *   <Heading as="h2" id="approach-heading">Our approach</Heading>
 * </Section>
 */
export function Section({
  tone,
  spacing,
  divider,
  width,
  bleed = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(sectionVariants({ tone, spacing, divider }), className)}
      {...props}
    >
      {bleed ? children : <Container width={width}>{children}</Container>}
    </section>
  );
}
