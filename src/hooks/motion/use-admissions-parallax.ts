"use client";

import type { RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function useAdmissionsParallax(
  containerRef: RefObject<HTMLElement | null>,
  sectionRef: RefObject<HTMLElement | null>,
  leftColRef: RefObject<HTMLElement | null>
) {
  useGSAP(
    () => {
      if (!containerRef.current) return;

      const section = sectionRef.current;
      const leftCol = leftColRef.current;
      const sections = gsap.utils.toArray<HTMLElement>(".program-section");
      const images = gsap.utils.toArray<HTMLElement>(".program-image");

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (section && leftCol) {
          ScrollTrigger.create({
            trigger: section,
            start: "top 128px",
            end: "bottom bottom",
            pin: leftCol,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          });
        }

        sections.forEach((sec, i) => {
          ScrollTrigger.create({
            trigger: sec,
            start: "top center",
            end: "bottom center",
            onEnter: () => {
              images.forEach((img, index) => {
                gsap.to(img, {
                  opacity: i === index ? 1 : 0,
                  duration: 0.4,
                  overwrite: "auto",
                });
              });
            },
            onEnterBack: () => {
              images.forEach((img, index) => {
                gsap.to(img, {
                  opacity: i === index ? 1 : 0,
                  duration: 0.4,
                  overwrite: "auto",
                });
              });
            },
          });
        });
      });
    },
    { scope: containerRef },
  );
}
