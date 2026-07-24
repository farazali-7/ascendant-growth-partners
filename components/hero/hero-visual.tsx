"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * The hero visual: an abstract architectural composition, not a stock photo.
 *
 * Thin navy lines build an ascending structure crossed by a growth trajectory
 * — "strategic growth architecture" made geometric. Everything is inline SVG
 * (crisp at any density, no image request, no CLS).
 *
 * Two independent, non-conflicting transforms: the outer element runs the
 * one-time load reveal (fade + slight scale) in CSS; the inner element takes a
 * restrained scroll parallax (≤10px) in JS. Parallax is suppressed under
 * prefers-reduced-motion.
 */
export function HeroVisual({ className }: { className?: string }) {
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      // Drift the visual up to 10px as the hero scrolls away — subtle depth.
      const shift = Math.min(window.scrollY * 0.05, 10);
      el.style.transform = `translate3d(0, ${-shift}px, 0)`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn("hero-visual-reveal relative select-none", className)}
      aria-hidden="true"
    >
      {/* Soft radial ground — atmosphere rather than a flat panel. */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_70%_35%,color-mix(in_oklab,var(--agp-navy)_9%,transparent),transparent_70%)]" />

      <div ref={innerRef} className="will-change-transform text-primary">
        <svg
          viewBox="0 0 500 520"
          fill="none"
          className="h-auto w-full"
          role="presentation"
        >
          {/* Concentric system arcs */}
          <g stroke="currentColor" strokeWidth="1">
            <circle cx="330" cy="190" r="150" opacity="0.14" />
            <circle cx="330" cy="190" r="104" opacity="0.18" />
            <circle cx="330" cy="190" r="58" opacity="0.24" />
          </g>

          {/* Faint baseline grid */}
          <g stroke="currentColor" strokeWidth="1" opacity="0.12">
            <line x1="40" y1="430" x2="470" y2="430" />
            <line x1="40" y1="360" x2="470" y2="360" />
            <line x1="40" y1="290" x2="470" y2="290" />
          </g>

          {/* Ascending structure — columns of increasing height (growth) */}
          <g stroke="currentColor" strokeWidth="1.5">
            {[
              { x: 90, y: 380 },
              { x: 150, y: 340 },
              { x: 210, y: 300 },
              { x: 270, y: 250 },
              { x: 330, y: 196 },
              { x: 390, y: 150 },
            ].map((c) => (
              <line
                key={c.x}
                x1={c.x}
                y1="430"
                x2={c.x}
                y2={c.y}
                opacity="0.4"
              />
            ))}
          </g>

          {/* Growth trajectory with nodes */}
          <polyline
            points="90,380 150,340 210,300 270,250 330,196 390,150"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.85"
          />
          {[
            { x: 90, y: 380 },
            { x: 150, y: 340 },
            { x: 210, y: 300 },
            { x: 270, y: 250 },
            { x: 330, y: 196 },
            { x: 390, y: 150 },
          ].map((c) => (
            <g key={`${c.x}-node`}>
              <circle cx={c.x} cy={c.y} r="8" fill="var(--agp-canvas)" />
              <circle
                cx={c.x}
                cy={c.y}
                r="4.5"
                fill="currentColor"
                opacity="0.92"
              />
            </g>
          ))}

          {/* A single confident diagonal — the throughline */}
          <line
            x1="60"
            y1="470"
            x2="440"
            y2="110"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.2"
          />
        </svg>
      </div>
    </div>
  );
}
