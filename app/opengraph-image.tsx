import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site-config";

/**
 * Social preview image (Open Graph + Twitter).
 *
 * The `opengraph-image` file convention populates both og:image and
 * twitter:image for every route that inherits root metadata, so a shared link
 * previews as a branded card rather than a bare URL. Rendered on the Executive
 * Slate palette to match the site.
 */
export const alt = `${siteConfig.name} — Executive Advisory`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand tokens are inlined here: this runs in the OG renderer, which has no
// access to the site's CSS custom properties.
const NAVY = "#0F172A";
const CANVAS = "#FAFAF9";
const MUTED = "#94A3B8";
const LINE = "rgba(203, 213, 225, 0.24)";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: NAVY,
          padding: "80px",
          color: CANVAS,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          <div style={{ width: 48, height: 1, background: MUTED }} />
          Strategic Growth Architecture
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 900,
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            Building enterprises for an AI-defined future.
          </div>
          <div style={{ fontSize: 26, color: MUTED, maxWidth: 760 }}>
            An executive advisory firm working where strategy meets execution.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${LINE}`,
            paddingTop: 32,
            fontSize: 26,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 12,
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            <span>Ascendant</span>
            <span
              style={{
                fontSize: 18,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: MUTED,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Growth Partners
            </span>
          </div>
          <div style={{ fontSize: 20, color: MUTED }}>
            ascendantgrowthpartners.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
