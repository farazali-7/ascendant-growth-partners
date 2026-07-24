import Link from "next/link";

import { Text } from "@/components/typography";
import type { InsightArticle } from "./sections-data";

/**
 * An insight preview.
 *
 * The image slot is a typographic tonal panel standing in for editorial
 * photography (added in a later stage); it still carries the specified
 * hover-zoom so the interaction is real now. On hover the card lifts and the
 * image scales a hair — restrained, never a 3% lurch.
 */
export function InsightCard({ article }: { article: InsightArticle }) {
  return (
    <Link
      href={article.href}
      className="group/insight flex min-h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-[transform,border-color] duration-(--dur-cta) ease-editorial hover:-translate-y-1 hover:border-border-strong focus-visible:-translate-y-1 focus-visible:border-border-strong"
    >
      {/* Editorial image placeholder */}
      <div className="relative aspect-[4/3] overflow-hidden bg-primary">
        <div className="absolute inset-0 scale-100 bg-[radial-gradient(120%_120%_at_20%_0%,color-mix(in_oklab,white_14%,transparent),transparent_55%)] transition-transform duration-500 ease-editorial group-hover/insight:scale-[1.03]" />
        <span className="absolute left-5 top-5 text-eyebrow uppercase text-primary-foreground/70">
          {article.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-h3 leading-snug text-foreground">
          {article.title}
        </h3>
        <Text
          as="div"
          size="sm"
          tone="muted"
          measure="none"
          className="mt-auto flex items-center gap-2 pt-2"
        >
          <span>{article.date}</span>
          <span aria-hidden="true" className="opacity-40">
            ·
          </span>
          <span>{article.readingTime}</span>
        </Text>
      </div>
    </Link>
  );
}
