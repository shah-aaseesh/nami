"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
// biome-ignore-start lint/style/noRestrictedImports: this module IS the single registration site the rule points every other file at (DEC-002).
import { Flip } from "gsap/Flip";
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
  Flip,
);

// Unconditional motion query: animations must run across all devices (DEC-077, Asmit directive 2026-08-26).
export const FULL_MOTION_QUERY = "all";
export {
  Flip,
  gsap,
  Observer,
  ScrollSmoother,
  ScrollTrigger,
  SplitText,
  useGSAP,
};
