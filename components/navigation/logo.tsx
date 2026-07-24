import Link from "next/link";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

/**
 * The firm wordmark.
 *
 * A luxury logo "exists" rather than performs — so hover is a barely-there
 * opacity lift, never a scale, rotate or bounce. It is a Server Component; the
 * only interactivity is the CSS hover on the link.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn(
        "group/logo inline-flex items-baseline gap-2 rounded-sm opacity-95 transition-opacity duration-(--dur-color) ease-editorial hover:opacity-100 focus-visible:opacity-100",
        className,
      )}
    >
      <span className="font-display text-[1.35rem] leading-none tracking-[-0.02em] text-current">
        Ascendant
      </span>
      <span
        aria-hidden="true"
        className="hidden text-eyebrow uppercase text-current opacity-55 sm:inline"
      >
        Growth Partners
      </span>
    </Link>
  );
}
