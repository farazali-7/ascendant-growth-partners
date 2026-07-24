import { Section, type SectionProps } from "@/components/shared";
import { Eyebrow, Heading, Text } from "@/components/typography";

export interface GuideSectionProps
  extends Omit<SectionProps, "children" | "aria-labelledby"> {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

/**
 * A titled block of the style guide.
 *
 * Derives the heading id from the section id so `aria-labelledby` is always
 * wired correctly — a <section> without an accessible name is not exposed as a
 * landmark at all.
 */
export function GuideSection({
  id,
  eyebrow,
  title,
  description,
  children,
  ...sectionProps
}: GuideSectionProps) {
  const headingId = `${id}-heading`;

  return (
    <Section id={id} aria-labelledby={headingId} spacing="compact" {...sectionProps}>
      <div className="flex flex-col gap-4">
        <Eyebrow marker>{eyebrow}</Eyebrow>
        <Heading as="h2" size="h2" id={headingId}>
          {title}
        </Heading>
        <Text size="lead">{description}</Text>
      </div>

      <div className="mt-10 sm:mt-12">{children}</div>
    </Section>
  );
}
