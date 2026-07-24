import { cn } from "@/lib/utils";

import type { ScaleToken } from "../_lib/tokens";

export interface ScaleTableProps {
  tokens: ScaleToken[];
  caption: string;
  /**
   * Optional visual preview per token, keyed by `ScaleToken.name`.
   *
   * Must be a map of literal class strings declared in source. Building the
   * class at runtime (`shadow-${name}`) would leave Tailwind unable to see it,
   * and no CSS would be generated.
   */
  previews?: Record<string, string>;
}

export function ScaleTable({ tokens, caption, previews }: ScaleTableProps) {
  return (
    // Tables are the one element allowed to scroll horizontally on narrow
    // viewports; the page body itself never does.
    <div className="-mx-gutter overflow-x-auto px-gutter">
      <table className="w-full min-w-[36rem] border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b">
            <th
              scope="col"
              className="py-3 pr-4 font-sans text-eyebrow uppercase text-muted-foreground"
            >
              Token
            </th>
            <th
              scope="col"
              className="py-3 pr-4 font-sans text-eyebrow uppercase text-muted-foreground"
            >
              Utility
            </th>
            <th
              scope="col"
              className="py-3 pr-4 font-sans text-eyebrow uppercase text-muted-foreground"
            >
              Value
            </th>
            <th
              scope="col"
              className="py-3 font-sans text-eyebrow uppercase text-muted-foreground"
            >
              {previews ? "Preview" : "Usage"}
            </th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <tr key={token.name} className="border-b last:border-b-0">
              <th
                scope="row"
                className="py-4 pr-4 align-top font-sans text-body-sm font-medium text-foreground"
              >
                {token.name}
              </th>
              <td className="py-4 pr-4 align-top">
                <code className="rounded-sm bg-secondary px-2 py-1 font-mono text-[0.6875rem] leading-none text-ink-secondary">
                  {token.utility}
                </code>
              </td>
              <td className="py-4 pr-4 align-top font-mono text-[0.6875rem] text-muted-foreground">
                {token.value}
              </td>
              <td className="py-4 align-top">
                {previews ? (
                  <div
                    aria-hidden="true"
                    className={cn(
                      "size-12 bg-card ring-1 ring-foreground/10",
                      previews[token.name],
                    )}
                  />
                ) : (
                  <span className="font-sans text-body-sm text-muted-foreground">
                    {token.usage}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
