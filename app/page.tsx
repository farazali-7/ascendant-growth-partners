import { Hero } from "@/components/hero";
import {
  BusinessReality,
  Capabilities,
  Comparison,
  Cta,
  Faq,
  Insights,
  Methodology,
  Philosophy,
  Principles,
} from "@/components/sections";

/**
 * Home.
 *
 * The section order follows the executive's line of questions — who are you,
 * why care, how do you think, what do you do, how do you work, why you, can I
 * trust you, and finally: let's talk. Each section answers exactly one, so the
 * page reads as an argument rather than a catalogue. The footer is mounted
 * globally in the root layout.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <BusinessReality />
      <Capabilities />
      <Methodology />
      <Comparison />
      <Insights />
      <Principles />
      <Faq />
      <Cta />
    </>
  );
}
