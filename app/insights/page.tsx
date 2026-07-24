import type { Metadata } from "next";

import { InsightsExplorer } from "@/components/insights/insights-explorer";
import { Container, PageHeader } from "@/components/shared";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Ideas that shape resilient organisations — writing on enterprise readiness, AI transformation and organisational design from Ascendant Growth Partners.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: `Insights — ${siteConfig.name}`,
    description: "Ideas that shape resilient organisations.",
    url: "/insights",
  },
};

export default function InsightsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Ideas that shape resilient organisations."
        lead="Writing on enterprise readiness, AI transformation and the architecture of organisations built to adapt. Considered rather than frequent."
      />

      <section className="py-section" aria-label="Insights">
        <Container>
          <InsightsExplorer />
        </Container>
      </section>
    </>
  );
}
