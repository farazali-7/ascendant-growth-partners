import Link from "next/link";

import { Logo } from "@/components/navigation";
import { primaryNav, primaryCta } from "@/components/navigation";
import { Container } from "@/components/shared";
import { siteConfig } from "@/lib/site-config";

interface ContactEntry {
  label: string;
  href?: string;
  external?: boolean;
}

const contact: ContactEntry[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", external: true },
  {
    label: "hello@ascendantgrowthpartners.com",
    href: "mailto:hello@ascendantgrowthpartners.com",
  },
  { label: "London · New York" },
];

/**
 * Global footer.
 *
 * Minimal and structural: mission on the left, navigation in the middle,
 * contact on the right, a hairline and copyright beneath. The only large dark
 * surface in the system — footer ink on footer surface is AAA, which matters
 * because legal text is the smallest on the page.
 *
 * Rendered once in the root layout so every page inherits it.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-footer text-footer-foreground">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] lg:py-20">
        {/* Mission */}
        <div className="flex flex-col gap-5">
          <Logo className="text-footer-foreground" />
          <p className="max-w-[34ch] text-body-sm leading-relaxed text-footer-foreground/70">
            An executive advisory firm building enterprises designed to adapt —
            at the level where strategy meets execution.
          </p>
        </div>

        {/* Navigation */}
        <nav aria-label="Footer" className="flex flex-col gap-4">
          <h2 className="text-eyebrow uppercase text-footer-foreground/50">
            Navigate
          </h2>
          <ul className="flex flex-col gap-3">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-body-sm text-footer-foreground/85 transition-colors duration-(--dur-color) ease-editorial hover:text-footer-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={primaryCta.href}
                className="text-body-sm text-footer-foreground/85 transition-colors duration-(--dur-color) ease-editorial hover:text-footer-foreground"
              >
                {primaryCta.label}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <h2 className="text-eyebrow uppercase text-footer-foreground/50">
            Contact
          </h2>
          <ul className="flex flex-col gap-3">
            {contact.map((entry) => (
              <li key={entry.label}>
                {entry.href ? (
                  <Link
                    href={entry.href}
                    {...(entry.external
                      ? { target: "_blank", rel: "noreferrer noopener" }
                      : {})}
                    className="text-body-sm text-footer-foreground/85 transition-colors duration-(--dur-color) ease-editorial hover:text-footer-foreground"
                  >
                    {entry.label}
                  </Link>
                ) : (
                  <span className="text-body-sm text-footer-foreground/85">
                    {entry.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-body-sm text-footer-foreground/60">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-body-sm text-footer-foreground/60">
            Strategic Growth Architecture
          </p>
        </Container>
      </div>
    </footer>
  );
}
