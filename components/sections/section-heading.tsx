import { Reveal } from "@/components/shared";
import { Eyebrow, Heading, Text } from "@/components/typography";
import { cn } from "@/lib/utils";

/**
 * The eyebrow + heading + optional subtitle block that opens most sections.
 *
 * Extracted so every section shares one heading rhythm and one reveal timing,
 * rather than each re-assembling (and slowly diverging) the same three parts.
 * The heading level is required — the caller owns the document outline.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  as,
  id,
  align = "start",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  as: "h2" | "h3";
  id?: string;
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Eyebrow marker={align === "start"}>{eyebrow}</Eyebrow>
      <Heading as={as} size="h2" id={id} className="max-w-[20ch]">
        {title}
      </Heading>
      {subtitle ? (
        <Text size="lead" measure={align === "center" ? "narrow" : "default"}>
          {subtitle}
        </Text>
      ) : null}
    </Reveal>
  );
}
