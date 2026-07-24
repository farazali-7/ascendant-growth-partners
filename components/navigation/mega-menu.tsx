"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/shared";
import { cn } from "@/lib/utils";
import type { NavItem } from "./nav-config";

/** Base stagger step between successive revealed elements. */
const STEP_MS = 45;

interface MegaMenuProps {
  item: NavItem;
  open: boolean;
  panelId: string;
  labelledBy: string;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  /** Close the menu once a destination is chosen. */
  onNavigate: () => void;
}

/**
 * The full-bleed mega-menu panel.
 *
 * Motion lives entirely in CSS (`.mega-*` in globals): the panel fades and
 * glides down, its columns settle upward in a staggered rhythm, and the
 * editorial cell scales in last. Kept mounted and toggled via `data-state` so
 * the close animation is as considered as the open.
 *
 * A transparent hover bridge sits above the panel: moving the cursor from the
 * trigger into the panel crosses no dead gap, so the menu never closes by
 * accident.
 */
export function MegaMenu({
  item,
  open,
  panelId,
  labelledBy,
  onPointerEnter,
  onPointerLeave,
  onNavigate,
}: MegaMenuProps) {
  if (!item.columns) return null;

  // Assign each revealed element an increasing delay in reading order:
  // columns left-to-right, then the feature cell.
  let order = 0;

  return (
    <div
      id={panelId}
      role="region"
      aria-labelledby={labelledBy}
      aria-hidden={!open}
      data-state={open ? "open" : "closed"}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className="mega-panel absolute inset-x-0 top-full border-b border-border bg-[color-mix(in_oklab,var(--agp-canvas)_97%,transparent)] shadow-card backdrop-blur-xl"
    >
      {/* Transparent bridge covering the gap between bar and panel content. */}
      <span aria-hidden="true" className="absolute inset-x-0 -top-4 h-4" />

      <Container className="grid gap-x-12 gap-y-10 py-10 lg:grid-cols-[1fr_1fr_1.1fr] lg:py-12">
        {item.columns.map((column) => (
          <div key={column.heading} className="flex flex-col gap-5">
            <p
              className="mega-item text-eyebrow uppercase text-muted-foreground"
              style={{ "--stagger": `${order++ * STEP_MS}ms` } as React.CSSProperties}
            >
              {column.heading}
            </p>

            <ul className="flex flex-col gap-4">
              {column.items.map((leaf) => (
                <li
                  key={leaf.href}
                  className="mega-item"
                  style={
                    { "--stagger": `${order++ * STEP_MS}ms` } as React.CSSProperties
                  }
                >
                  <Link
                    href={leaf.href}
                    onClick={onNavigate}
                    className="group/leaf block rounded-sm"
                    tabIndex={open ? undefined : -1}
                  >
                    <span className="flex items-center gap-1.5 text-body-sm font-medium text-foreground transition-[color,gap] duration-(--dur-color) ease-editorial group-hover/leaf:gap-2.5 group-hover/leaf:text-primary group-focus-visible/leaf:text-primary">
                      {leaf.label}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-3.5 -translate-x-1 opacity-0 transition-all duration-(--dur-icon) ease-editorial group-hover/leaf:translate-x-0 group-hover/leaf:opacity-70 group-focus-visible/leaf:translate-x-0 group-focus-visible/leaf:opacity-70"
                      />
                    </span>
                    {leaf.description ? (
                      <span className="mt-1 block max-w-[26ch] text-body-sm text-muted-foreground">
                        {leaf.description}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {item.feature ? (
          <Link
            href={item.feature.href}
            onClick={onNavigate}
            tabIndex={open ? undefined : -1}
            className={cn(
              "mega-editorial group/feature relative flex min-h-56 flex-col justify-between overflow-hidden rounded-xl bg-primary p-7 text-primary-foreground",
              "transition-[background-color] duration-(--dur-cta) ease-editorial hover:bg-(--agp-navy-hover)",
            )}
          >
            {/* Faint tonal wash for depth; stands in for the editorial image
                that arrives in a later stage. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-[color-mix(in_oklab,white_10%,transparent)] blur-2xl"
            />
            <span className="text-eyebrow uppercase text-primary-foreground/70">
              {item.feature.eyebrow}
            </span>
            <span className="relative flex flex-col gap-4">
              <span className="font-display text-h3 leading-tight text-primary-foreground">
                {item.feature.title}
              </span>
              <span className="inline-flex items-center gap-1.5 text-body-sm font-medium text-primary-foreground/85 transition-[gap] duration-(--dur-color) ease-editorial group-hover/feature:gap-2.5">
                {item.feature.cta}
                <ArrowRight aria-hidden="true" className="size-4" />
              </span>
            </span>
          </Link>
        ) : null}
      </Container>
    </div>
  );
}
