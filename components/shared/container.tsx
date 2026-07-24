import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Elements a container is permitted to render as. Deliberately a closed union
 * rather than a fully generic polymorphic type: it keeps inference fast and
 * prevents a container becoming, say, a <span>.
 */
type ContainerElement = "div" | "section" | "header" | "footer" | "article" | "nav";

const containerVariants = cva("mx-auto w-full", {
  variants: {
    /**
     * Measure. `editorial` is ~68 characters — the readable range for
     * sustained prose. `content` is the default section width.
     */
    width: {
      editorial: "max-w-editorial",
      content: "max-w-content",
      wide: "max-w-wide",
      full: "max-w-none",
    },
    /** Disable only when a child needs to bleed to the viewport edge. */
    gutter: {
      true: "px-gutter",
      false: "",
    },
  },
  defaultVariants: {
    width: "content",
    gutter: true,
  },
});

/** Element-agnostic base so every permitted `as` value type-checks. */
export interface ContainerProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof containerVariants> {
  as?: ContainerElement;
}

/**
 * Horizontal measure and page gutter.
 *
 * The single source of horizontal rhythm — every section aligns to the same
 * left edge because they all resolve the same `--spacing-gutter` token.
 */
export function Container({
  as: Component = "div",
  width,
  gutter,
  className,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(containerVariants({ width, gutter }), className)}
      {...props}
    />
  );
}
