import { Reveal } from "./reveal";
import { Container } from "./container";
import { Eyebrow, Heading, Text } from "@/components/typography";
import { cn } from "@/lib/utils";

/**
 * The masthead for interior pages.
 *
 * Shares the hero's editorial rhythm (eyebrow → display heading → standfirst)
 * and clears the overlaying sticky header with generous top padding, so every
 * secondary page opens with the same confident, unhurried first impression.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  id = "page-heading",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section
      aria-labelledby={id}
      className={cn(
        "border-b border-border pb-14 pt-36 sm:pb-16 lg:pb-20 lg:pt-44",
        className,
      )}
    >
      <Container>
        <Reveal className="flex max-w-[46rem] flex-col gap-6">
          <Eyebrow marker tone="accent">
            {eyebrow}
          </Eyebrow>
          <Heading as="h1" size="display" id={id}>
            {title}
          </Heading>
          {lead ? <Text size="lead">{lead}</Text> : null}
        </Reveal>
      </Container>
    </section>
  );
}
