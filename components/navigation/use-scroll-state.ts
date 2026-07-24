"use client";

import { useEffect, useState } from "react";

export interface ScrollState {
  /** Past the point where the header adopts its frosted, compact surface. */
  scrolled: boolean;
  /** Header should retract (scrolling down, well past the top). */
  hidden: boolean;
}

interface Options {
  /** Scroll distance at which the frosted surface engages. */
  surfaceThreshold?: number;
  /** Scroll distance below which the header never retracts. */
  hideThreshold?: number;
}

/**
 * Tracks vertical scroll to drive two independent header behaviours: the
 * transparent→frosted surface transition, and scroll-direction retraction
 * (down hides, up reveals — "navigation that feels alive").
 *
 * Reads are batched into a single rAF and the listener is passive, so scrolling
 * is never blocked. State only updates on an actual change, avoiding renders on
 * every pixel.
 */
export function useScrollState({
  surfaceThreshold = 24,
  hideThreshold = 240,
}: Options = {}): ScrollState {
  const [state, setState] = useState<ScrollState>({
    scrolled: false,
    hidden: false,
  });

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const goingDown = y > lastY;
      const delta = Math.abs(y - lastY);

      setState((prev) => {
        const scrolled = y > surfaceThreshold;
        // A small delta guard stops trackpad jitter from flickering the header.
        let hidden = prev.hidden;
        if (y <= hideThreshold) {
          hidden = false;
        } else if (delta > 6) {
          hidden = goingDown;
        }

        if (scrolled === prev.scrolled && hidden === prev.hidden) {
          return prev;
        }
        return { scrolled, hidden };
      });

      lastY = y;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    // Establish initial state (e.g. when loaded already scrolled).
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [surfaceThreshold, hideThreshold]);

  return state;
}
