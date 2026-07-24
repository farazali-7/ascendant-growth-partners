"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { primaryCta, primaryNav } from "./nav-config";

/**
 * Full-screen mobile navigation.
 *
 * Luxury brands go immersive rather than dropping a small tray, so this is a
 * full overlay: the surface fades in and the links settle upward in sequence.
 * While open it locks body scroll, traps focus, closes on Escape, and returns
 * focus to the trigger â€” so the drawer is operable entirely from the keyboard.
 *
 * Kept mounted and toggled with `data-state` so both open and close animate.
 */
export function MobileNav({
  open,
  onClose,
  id,
  returnFocusRef,
}: {
  open: boolean;
  onClose: () => void;
  id: string;
  returnFocusRef: React.RefObject<HTMLElement | null>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Lock the page behind the overlay and restore on close.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  // Move focus in on open; return it to the trigger on close.
  useEffect(() => {
    if (open) {
      firstLinkRef.current?.focus();
    } else {
      returnFocusRef.current?.focus();
    }
  }, [open, returnFocusRef]);

  // Escape to close, and a lightweight focus trap within the panel.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Flat, ordered list of destinations for a predictable stagger and tab order.
  const links = primaryNav.flatMap((item) =>
    item.columns
      ? [
          { label: item.label, href: item.href, lead: true },
          ...item.columns.flatMap((column) =>
            column.items.map((leaf) => ({
              label: leaf.label,
              href: leaf.href,
              lead: false,
            })),
          ),
        ]
      : [{ label: item.label, href: item.href, lead: true }],
  );

  return (
    <div
      id={id}
      ref={panelRef}
      data-state={open ? "open" : "closed"}
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-40 flex flex-col bg-background lg:hidden",
        "transition-[opacity,visibility] duration-(--dur-navbar) ease-editorial",
        open
          ? "visible opacity-100"
          : "invisible opacity-0 [transition-delay:0s,var(--dur-navbar)]",
      )}
    >
      {/* Spacer matching the header bar so the drawer opens beneath it. */}
      <div className="h-(--header-h) shrink-0" />

      <nav
        aria-label="Mobile"
        data-state={open ? "open" : "closed"}
        className="flex flex-1 flex-col gap-1 overflow-y-auto px-gutter pb-10"
      >
        {links.map((link, index) => (
          <Link
            key={link.href}
            ref={index === 0 ? firstLinkRef : undefined}
            href={link.href}
            onClick={onClose}
            tabIndex={open ? undefined : -1}
            style={{ "--stagger": `${index * 40}ms` } as React.CSSProperties}
            className={cn(
              "drawer-item group/mlink flex items-center justify-between border-b border-border/70 py-4",
              link.lead
                ? "font-display text-h2 text-foreground"
                : "pl-4 text-body text-ink-secondary",
            )}
          >
            <span>{link.label}</span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-5 text-muted-foreground opacity-0 transition-opacity duration-(--dur-icon) ease-editorial group-hover/mlink:opacity-100 group-focus-visible/mlink:opacity-100"
            />
          </Link>
        ))}

        <div
          className="drawer-item mt-8"
          style={{ "--stagger": `${links.length * 40}ms` } as React.CSSProperties}
        >
          <Button
            render={<Link href={primaryCta.href} onClick={onClose} />}
            size="lg"
            className="w-full hover:bg-(--agp-navy-hover)"
            tabIndex={open ? undefined : -1}
          >
            {primaryCta.label}
          </Button>
        </div>
      </nav>
    </div>
  );
}
