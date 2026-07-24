import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Text } from "@/components/typography";
import type { Capability } from "./sections-data";

/**
 * A single capability. Border-led rather than shadowed: on hover the whole
 * card lifts two pixels, its border darkens, and the arrow advances — the
 * consistent card interaction used across the site.
 */
export function CapabilityCard({
  capability,
  index,
}: {
  capability: Capability;
  index: number;
}) {
  return (
    <Link
      href={capability.href}
      className="group/cap flex min-h-full flex-col gap-5 rounded-xl border border-border bg-card p-7 transition-[transform,border-color] duration-(--dur-cta) ease-editorial hover:-translate-y-0.5 hover:border-border-strong focus-visible:-translate-y-0.5 focus-visible:border-border-strong"
    >
      <span
        aria-hidden="true"
        className="font-mono text-body-sm tabular-nums text-muted-foreground"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="flex flex-1 flex-col gap-2.5">
        <h3 className="font-sans text-h3 text-foreground">{capability.title}</h3>
        <Text size="sm" measure="none">
          {capability.body}
        </Text>
      </div>

      <ArrowRight
        aria-hidden="true"
        className="size-4 text-muted-foreground transition-[transform,color] duration-(--dur-icon) ease-editorial group-hover/cap:translate-x-1 group-hover/cap:text-primary group-focus-visible/cap:translate-x-1 group-focus-visible/cap:text-primary"
      />
    </Link>
  );
}
