import { MAIN_CONTENT_ID } from "./landmarks";

/**
 * Bypass block (WCAG 2.4.1). Renders off-canvas and slides into view on
 * keyboard focus.
 *
 * It stays in flow-independent absolute position rather than toggling
 * `sr-only`, so revealing it cannot reflow the page underneath the user at the
 * moment they focus it.
 */
export function SkipLink() {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className="absolute start-gutter top-0 z-50 -translate-y-full rounded-lg bg-primary px-4 py-3 text-body-sm font-medium text-primary-foreground shadow-lifted transition-transform duration-150 ease-editorial focus:translate-y-4"
    >
      Skip to main content
    </a>
  );
}
