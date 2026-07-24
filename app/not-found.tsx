import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/shared";
import { Eyebrow, Heading, Text } from "@/components/typography";
import { Button } from "@/components/ui/button";

/**
 * 404. Editorial rather than apologetic — the same calm voice as the rest of
 * the site. Renders within the root layout, so the header and footer stay
 * present and the visitor is never stranded.
 */
export default function NotFound() {
  return (
    <Container className="flex min-h-[68svh] max-w-editorial flex-col items-start justify-center gap-6 py-section">
      <Eyebrow marker tone="accent">
        404
      </Eyebrow>
      <Heading as="h1" size="display">
        This page isn&rsquo;t here.
      </Heading>
      <Text size="lead">
        The page may have moved, or perhaps it never existed. Let&rsquo;s help
        you find what you&rsquo;re looking for.
      </Text>
      <Button
        render={<Link href="/" />}
        size="lg"
        className="mt-2 h-12 gap-2 px-7 text-body-sm transition-[background-color,transform,box-shadow] duration-(--dur-cta) ease-editorial hover:-translate-y-px hover:bg-(--agp-navy-hover) hover:shadow-card"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Return home
      </Button>
    </Container>
  );
}
