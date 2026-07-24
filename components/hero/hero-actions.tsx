import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * The hero's two calls to action.
 *
 * The firm sells conversations, not products, so the language is invitational
 * ("Start a conversation" / "Explore our approach") rather than transactional.
 * The primary hover is deliberately quiet â€” the background deepens and the
 * button lifts a single pixel; no scale, glow or bounce.
 */
export function HeroActions({
  delay = 0,
  className,
}: {
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "hero-reveal flex flex-col gap-3 sm:flex-row sm:items-center",
        className,
      )}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      <Button
        render={<Link href="/contact" />}
        size="lg"
        className="h-12 gap-2 px-7 text-body-sm transition-[background-color,transform,box-shadow] duration-(--dur-cta) ease-editorial hover:-translate-y-px hover:bg-(--agp-navy-hover) hover:shadow-card"
      >
        Start a conversation
        <ArrowRight aria-hidden="true" className="size-4" />
      </Button>

      <Button
        variant="outline"
        render={<Link href="/firm" />}
        size="lg"
        className="h-12 px-7 text-body-sm transition-colors duration-(--dur-cta) ease-editorial hover:border-border-strong"
      >
        Explore our approach
      </Button>
    </div>
  );
}
