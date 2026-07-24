import { cn } from "@/lib/utils";
import { Text } from "@/components/typography";

import {
  contrastRatio,
  formatRatio,
  gradeContrast,
  type WcagGrade,
} from "../_lib/contrast";
import type { ColorToken } from "../_lib/tokens";

/**
 * Grade styling. A static map rather than interpolation so Tailwind can
 * statically extract every class it needs to generate.
 */
const gradeStyles: Record<WcagGrade, string> = {
  AAA: "border-success/25 bg-success/10 text-success",
  AA: "border-success/25 bg-success/10 text-success",
  "AA Large": "border-border-strong bg-secondary text-ink-secondary",
  Fail: "border-destructive/25 bg-destructive/10 text-destructive",
};

function ContrastBadge({
  surface,
  ratio,
}: {
  surface: string;
  ratio: number;
}) {
  const grade = gradeContrast(ratio);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 font-mono text-[0.6875rem] leading-none",
        gradeStyles[grade],
      )}
    >
      <span className="opacity-70">{surface}</span>
      <span aria-hidden="true" className="opacity-30">
        /
      </span>
      <span>{formatRatio(ratio)}</span>
      <span aria-hidden="true" className="opacity-30">
        /
      </span>
      <span className="font-medium">{grade}</span>
    </span>
  );
}

export function ColorSwatch({ token }: { token: ColorToken }) {
  const measurements = (token.against ?? []).map((target) => ({
    surface: target.label,
    ratio: contrastRatio(token.hex, target.hex),
  }));

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border bg-card">
      {/*
        The hex is runtime data, so it is passed through a CSS custom property.
        Tailwind cannot extract `bg-[${hex}]` from a dynamic value, and this is
        the same mechanism shadcn uses for its own data-driven values.
      */}
      <div
        style={{ "--swatch": token.hex } as React.CSSProperties}
        className="h-20 w-full border-b bg-(--swatch) sm:h-24"
      />

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h3 className="font-sans text-h4 text-foreground">{token.label}</h3>
          <code className="font-mono text-body-sm text-muted-foreground uppercase">
            {token.hex}
          </code>
        </div>

        <Text size="sm" tone="muted" measure="none" className="flex-1">
          {token.usage}
        </Text>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <code className="rounded-sm bg-secondary px-2 py-1 font-mono text-[0.6875rem] leading-none text-ink-secondary">
            --{token.variable}
          </code>
          {measurements.map((measurement) => (
            <ContrastBadge
              key={measurement.surface}
              surface={measurement.surface}
              ratio={measurement.ratio}
            />
          ))}
        </div>

        {token.caveat ? (
          <p className="mt-1 rounded-md border border-destructive/25 bg-destructive/5 p-3 font-sans text-body-sm text-ink-secondary">
            <strong className="font-medium text-destructive">Caveat.</strong>{" "}
            {token.caveat}
          </p>
        ) : null}
      </div>
    </div>
  );
}
