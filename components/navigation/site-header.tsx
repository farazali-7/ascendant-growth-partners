"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { Container } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Logo } from "./logo";
import { MegaMenu } from "./mega-menu";
import { MenuToggle } from "./menu-toggle";
import { MobileNav } from "./mobile-nav";
import { NavLink } from "./nav-link";
import { SearchField } from "./search-field";
import { primaryCta, primaryNav } from "./nav-config";
import { useScrollState } from "./use-scroll-state";

/** Hover-intent timings â€” deliberate open, forgiving close. */
const OPEN_DELAY = 100;
const CLOSE_GRACE = 150;
const MOBILE_NAV_ID = "mobile-navigation";

/**
 * The site masthead and the seat of all navbar state.
 *
 * Centralising open/scroll/mobile state here keeps the mega menu, its trigger,
 * and the retract behaviour in agreement â€” the panel can be full-bleed while
 * its trigger sits inside the constrained bar, and hover intent spans both.
 *
 * The header is sticky, not fixed: it reserves its own space, so no page ever
 * has content hidden beneath it and there is zero layout shift. Over a future
 * dark hero, a `tone` seam can invert the text without touching this logic.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const { scrolled, hidden } = useScrollState();

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const clearTimers = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const scheduleOpen = useCallback((label: string) => {
    clearTimers();
    openTimer.current = setTimeout(() => setOpenMenu(label), OPEN_DELAY);
  }, []);

  const scheduleClose = useCallback(() => {
    clearTimers();
    closeTimer.current = setTimeout(() => setOpenMenu(null), CLOSE_GRACE);
  }, []);

  const closeNow = useCallback(() => {
    clearTimers();
    setOpenMenu(null);
  }, []);

  // Any navigation dismisses whatever is open.
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => clearTimers, []);

  // The header retracts on downward scroll, but never while something is open.
  const retracted = hidden && !openMenu && !mobileOpen;

  return (
    <header
      data-scrolled={scrolled}
      data-hidden={retracted}
      className="group/hd sticky top-0 z-50 -mb-(--header-h) transition-transform duration-(--dur-navbar) ease-editorial data-[hidden=true]:-translate-y-full"
    >
      <div className="nav-enter">
        {/* Frosted surface layer â€” invisible at rest, engaging on scroll. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 border-b border-transparent transition-[background-color,border-color,box-shadow] duration-(--dur-navbar) ease-editorial group-data-[scrolled=true]/hd:border-border group-data-[scrolled=true]/hd:bg-[color-mix(in_oklab,var(--agp-canvas)_80%,transparent)] group-data-[scrolled=true]/hd:shadow-subtle group-data-[scrolled=true]/hd:backdrop-blur-xl"
        />

        <Container
          as="nav"
          aria-label="Primary"
          className="flex h-(--header-h) items-center justify-between gap-6 text-foreground transition-[height] duration-(--dur-navbar) ease-editorial group-data-[scrolled=true]/hd:h-(--header-h-scrolled)"
          onMouseLeave={scheduleClose}
        >
          <div className="transition-transform duration-(--dur-navbar) ease-editorial group-data-[scrolled=true]/hd:scale-[0.98]">
            <Logo />
          </div>

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-8 lg:flex">
            {primaryNav.map((item) => {
              if (!item.columns) {
                return (
                  <li key={item.label}>
                    <NavLink href={item.href}>{item.label}</NavLink>
                  </li>
                );
              }

              const isOpen = openMenu === item.label;
              const panelId = `mega-${item.label.toLowerCase()}`;
              const triggerId = `${panelId}-trigger`;

              return (
                <li key={item.label}>
                  <button
                    type="button"
                    id={triggerId}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    aria-controls={panelId}
                    data-open={isOpen}
                    onMouseEnter={() => scheduleOpen(item.label)}
                    onClick={() => (isOpen ? closeNow() : setOpenMenu(item.label))}
                    onFocus={() => setOpenMenu(item.label)}
                    className="nav-underline group/trigger inline-flex h-9 items-center gap-1 text-body-sm text-current/75 transition-colors duration-(--dur-color) ease-editorial hover:text-current data-[open=true]:text-current"
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className="size-3.5 transition-transform duration-(--dur-icon) ease-editorial group-data-[open=true]/trigger:rotate-180"
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <SearchField />
            <Button
              render={<Link href={primaryCta.href} />}
              size="lg"
              className="hidden transition-[background-color,box-shadow] duration-(--dur-cta) ease-editorial hover:bg-(--agp-navy-hover) lg:inline-flex"
            >
              {primaryCta.label}
            </Button>
            <MenuToggle
              ref={toggleRef}
              open={mobileOpen}
              onToggle={() => setMobileOpen((prev) => !prev)}
              controls={MOBILE_NAV_ID}
              className="lg:hidden"
            />
          </div>
        </Container>

        {/* Full-bleed mega panels, controlled by the shared open state. */}
        {primaryNav
          .filter((item) => item.columns)
          .map((item) => {
            const panelId = `mega-${item.label.toLowerCase()}`;
            return (
              <MegaMenu
                key={item.label}
                item={item}
                open={openMenu === item.label}
                panelId={panelId}
                labelledBy={`${panelId}-trigger`}
                onPointerEnter={clearTimers}
                onPointerLeave={scheduleClose}
                onNavigate={closeNow}
              />
            );
          })}
      </div>

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        id={MOBILE_NAV_ID}
        returnFocusRef={toggleRef}
      />
    </header>
  );
}
