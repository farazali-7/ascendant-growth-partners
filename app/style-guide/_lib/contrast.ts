/**
 * WCAG 2.1 contrast utilities, used to verify the palette at build time.
 *
 * Ratios are computed from the real token values rather than recorded by hand,
 * so this page fails loudly if a colour is changed to something inaccessible.
 */

/** Channel transfer function from WCAG 2.1 relative luminance. */
function linearize(channel8Bit: number): number {
  const c = channel8Bit / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function parseHex(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "").trim();
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;

  if (!/^[0-9a-fA-F]{6}$/.test(expanded)) {
    throw new Error(`Invalid hex colour: "${hex}"`);
  }

  return [
    Number.parseInt(expanded.slice(0, 2), 16),
    Number.parseInt(expanded.slice(2, 4), 16),
    Number.parseInt(expanded.slice(4, 6), 16),
  ];
}

export function relativeLuminance(hex: string): number {
  const [r, g, b] = parseHex(hex);
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

/** Contrast ratio between two colours, from 1 to 21. */
export function contrastRatio(foreground: string, background: string): number {
  const a = relativeLuminance(foreground);
  const b = relativeLuminance(background);
  const [lighter, darker] = a > b ? [a, b] : [b, a];
  return (lighter + 0.05) / (darker + 0.05);
}

export type WcagGrade = "AAA" | "AA" | "AA Large" | "Fail";

/**
 * Grade a ratio for body-size text (AA 4.5:1, AAA 7:1). Ratios between 3:1 and
 * 4.5:1 are reported as "AA Large" — valid only at 24px+, or 18.66px+ bold.
 */
export function gradeContrast(ratio: number): WcagGrade {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "AA Large";
  return "Fail";
}

export function formatRatio(ratio: number): string {
  return `${ratio.toFixed(2)}:1`;
}
