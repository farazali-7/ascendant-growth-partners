import { Text } from "@/components/typography";
import { cn } from "@/lib/utils";

/**
 * Editorial empty state.
 *
 * Future-proofs any collection (insights, engagements) so an absence of content
 * reads as considered — "New insights coming soon." — rather than a blank box.
 * Announced politely to assistive technology via role="status".
 */
export function EmptyState({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-center gap-3 rounded-xl border border-dashed border-border-strong bg-secondary/50 px-8 py-16 text-center",
        className,
      )}
    >
      <p className="font-display text-h3 text-foreground">{title}</p>
      {description ? (
        <Text tone="muted" measure="narrow">
          {description}
        </Text>
      ) : null}
    </div>
  );
}
