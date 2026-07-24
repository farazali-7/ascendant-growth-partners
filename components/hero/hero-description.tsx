import { Text } from "@/components/typography";
import { cn } from "@/lib/utils";

/**
 * The hero standfirst — one confident paragraph, no buzzword pile-up.
 */
export function HeroDescription({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <Text
      size="lead"
      tone="secondary"
      className={cn("hero-reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Text>
  );
}
