"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
// biome-ignore-start lint/style/noRestrictedImports: this module IS the single registration site the rule points every other file at (DEC-002).
import { Observer } from "gsap/Observer";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// biome-ignore-end lint/style/noRestrictedImports: end of the exempt block.

gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  SplitText,
  ScrollSmoother,
  Observer,
);

export const FULL_MOTION_QUERY = "(prefers-reduced-motion: no-preference)";
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

type MotionBranches = {
  motion: gsap.ContextFunc;
  reduced?: gsap.ContextFunc;
};

export function matchMotion(
  branches: MotionBranches,
  scope?: Element | string | object,
): () => void {
  const mm = gsap.matchMedia(scope);
  mm.add(FULL_MOTION_QUERY, branches.motion);
  if (branches.reduced) {
    mm.add(REDUCED_MOTION_QUERY, branches.reduced);
  }
  return () => {
    mm.revert();
  };
}

export { gsap, Observer, ScrollSmoother, ScrollTrigger, SplitText, useGSAP };
