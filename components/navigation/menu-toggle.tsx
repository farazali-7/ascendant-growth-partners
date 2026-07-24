"use client";

import { cn } from "@/lib/utils";

/**
 * The mobile menu button: three rules that morph into an X.
 *
 * No hamburgerâ†’X icon swap â€” the same three bars translate and rotate, so the
 * change reads as one continuous gesture rather than a flip. Controlled by the
 * header so the icon state can never disagree with the drawer.
 */
export function MenuToggle({
  open,
  onToggle,
  controls,
  className,
  ref,
}: {
  open: boolean;
  onToggle: () => void;
  controls: string;
  className?: string;
  /** React 19 accepts `ref` as a plain prop on function components. */
  ref?: React.Ref<HTMLButtonElement>;
}) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={controls}
      aria-label={open ? "Close menu" : "Open menu"}
      data-open={open}
      className={cn(
        "group/toggle grid size-9 place-items-center rounded-lg text-current transition-colors duration-(--dur-icon) ease-editorial hover:bg-[color-mix(in_oklab,var(--agp-ink)_5%,transparent)]",
        className,
      )}
    >
      <span className="relative block h-3 w-5" aria-hidden="true">
        <span className="absolute left-0 top-0 h-px w-full bg-current transition-transform duration-(--dur-navbar) ease-editorial group-data-[open=true]/toggle:translate-y-[5.5px] group-data-[open=true]/toggle:rotate-45" />
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current transition-opacity duration-(--dur-icon) ease-editorial group-data-[open=true]/toggle:opacity-0" />
        <span className="absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-(--dur-navbar) ease-editorial group-data-[open=true]/toggle:-translate-y-[5.5px] group-data-[open=true]/toggle:-rotate-45" />
      </span>
    </button>
  );
}
