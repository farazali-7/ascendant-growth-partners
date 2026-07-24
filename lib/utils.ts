import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The design system defines custom named font-size utilities in globals.css
 * (`text-display`, `text-h1`, `text-lead`, …). tailwind-merge does not know
 * these are font sizes, so by default it classifies `text-display` as a *text
 * colour* and silently drops it whenever a colour utility (e.g. `text-foreground`)
 * is also present — which is exactly what `<Heading>` and `<Text>` produce.
 *
 * Registering the names under the `font-size` group makes tailwind-merge treat
 * them correctly: size and colour then live in different groups and coexist,
 * while two competing sizes still resolve last-wins as intended.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "h1",
            "h2",
            "h3",
            "h4",
            "lead",
            "body",
            "body-sm",
            "eyebrow",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
