"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

/**
 * A top-level navigation link with the centre-out underline and restrained
 * letter-spacing shift.
 *
 * Active state is derived from the path, not passed in, so it can never drift
 * out of sync with the route. It is expressed three ways at once — a resting
 * underline, medium weight, and full-strength ink — so the current section is
 * legible without relying on colour alone (WCAG 1.4.1).
 */
export function NavLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const isActive =
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      data-active={isActive}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "nav-underline inline-flex h-9 items-center text-body-sm text-current/75 transition-[color,letter-spacing] duration-(--dur-color) ease-editorial hover:text-current hover:tracking-[0.01em] focus-visible:text-current data-[active=true]:font-medium data-[active=true]:tracking-[0.01em] data-[active=true]:text-current",
        className,
      )}
    >
      {children}
    </Link>
  );
}
