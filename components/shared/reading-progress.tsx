"use client";

import { useEffect, useRef } from "react";

/**
 * A hairline reading-progress indicator across the top of the viewport.
 *
 * Understated by design — a single navy rule that fills with scroll depth,
 * suited to an editorial reading experience rather than a dashboard. Updates
 * are batched into a single rAF on a passive listener, and it transforms a
 * pre-painted element (no layout, no repaint of width). Decorative, so it is
 * hidden from assistive technology.
 */
export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const bar = barRef.current;
      if (!bar) return;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? doc.scrollTop / max : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5"
    >
      <div
        ref={barRef}
        className="h-full origin-left scale-x-0 bg-primary [will-change:transform]"
      />
    </div>
  );
}
