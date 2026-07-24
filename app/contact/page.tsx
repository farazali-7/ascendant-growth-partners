import type { Metadata } from "next";
import { Clock, Mail, MapPin, type LucideIcon } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { Container, PageHeader } from "@/components/shared";
import { Text } from "@/components/typography";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with Ascendant Growth Partners. We read every message ourselves and typically respond within one business day.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact — ${siteConfig.name}`,
    description:
      "Start a conversation about what your organisation needs to become.",
    url: "/contact",
  },
};

interface ContactDetail {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

const details: ContactDetail[] = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@ascendantgrowthpartners.com",
    href: "mailto:hello@ascendantgrowthpartners.com",
  },
  {
    icon: MapPin,
    label: "Offices",
    value: "London · New York",
  },
  {
    icon: Clock,
    label: "Response",
    value: "We typically respond within one business day.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let’s start a conversation."
        lead="Tell us where your organisation is heading and what stands in the way. If there is a fit, we’ll suggest a first conversation — no pitch, no obligation."
      />

      <section className="py-section" aria-label="Contact form and details">
        <Container className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <ContactForm />

          <aside className="flex flex-col gap-8 lg:border-l lg:border-border lg:pl-16">
            {details.map((detail) => (
              <div key={detail.label} className="flex flex-col gap-2">
                <span className="flex items-center gap-2 text-eyebrow uppercase text-muted-foreground">
                  <detail.icon aria-hidden="true" className="size-4" />
                  {detail.label}
                </span>
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="text-body text-foreground underline-offset-4 transition-colors duration-(--dur-color) ease-editorial hover:text-primary hover:underline"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <Text as="span" measure="narrow" className="text-foreground">
                    {detail.value}
                  </Text>
                )}
              </div>
            ))}
          </aside>
        </Container>
      </section>
    </>
  );
}
