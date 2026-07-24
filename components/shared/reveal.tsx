"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Scroll-triggered entrance wrapper.
 *
 * Adds the `.reveal` fade + settle when the element first enters the viewport,
 * then disconnects — the motion never re-fires. The child content is always in
 * the DOM (server-rendered), so search engines and no-JS visitors see it; only
 * its opacity is deferred. Under prefers-reduced-motion the CSS shows it
 * immediately regardless of the observer.
 *
 * `delay` staggers siblings; keep it small (≤160ms) to stay within the calm
 * motion language.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      // Capability fallback (no observer): reveal once so content is never
      // stranded hidden. A one-shot, not a reactive cascade.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      // Fire a little before fully in view so the settle reads as arrival.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-visible={visible}
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
