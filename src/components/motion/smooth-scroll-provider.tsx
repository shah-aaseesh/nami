"use client";

import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useRef } from "react";
import {
  FULL_MOTION_QUERY,
  gsap,
  ScrollSmoother,
  ScrollTrigger,
  useGSAP,
} from "@/lib/gsap";

const SMOOTH_SCROLL_QUERY = `${FULL_MOTION_QUERY} and (pointer: fine)`;
const EFFECT_TARGETS = "[data-speed], [data-lag]";
const WRAPPER_ID = "smooth-wrapper";
const CONTENT_ID = "smooth-content";

function hashTarget(): HTMLElement | null {
  const raw = window.location.hash.slice(1);
  if (raw === "") return null;
  let id = raw;
  try {
    id = decodeURIComponent(raw);
  } catch {
    id = raw;
  }
  return document.getElementById(id);
}

function MountSmootherBeforeSiblings() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(SMOOTH_SCROLL_QUERY, () => {
      const smoother = ScrollSmoother.create({
        content: `#${CONTENT_ID}`,
        effects: true,
        smooth: 1.2,
        wrapper: `#${WRAPPER_ID}`,
      });
      return () => smoother.kill();
    });

    return () => mm.revert();
  });

  return null;
}

export type SmoothScrollProviderProps = {
  children: ReactNode;
  chrome: ReactNode;
};

export function SmoothScrollProvider({
  children,
  chrome,
}: SmoothScrollProviderProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const scannedPath = useRef(pathname);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // The smoother fakes the scroll position, so a native scroll intent (hash nav,
    // focus, find-in-page) lands on the fixed wrapper instead of moving the page.
    const adoptNativeScroll = () => {
      const nudge = wrapper.scrollTop;
      const smoother = ScrollSmoother.get();
      if (nudge === 0 || !smoother) return;
      wrapper.scrollTop = 0;
      smoother.scrollTo(smoother.scrollTop() + nudge, false);
    };

    wrapper.addEventListener("scroll", adoptNativeScroll);

    // The browser's own hash landing already happened, against the pre-smoother
    // layout; redo it now that the smoother owns the scroll position.
    const smoother = ScrollSmoother.get();
    const target = hashTarget();
    if (smoother && target) {
      smoother.scrollTo(target, false, "top top");
    }

    return () => wrapper.removeEventListener("scroll", adoptNativeScroll);
  }, []);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    // ScrollSmoother runs an equivalent observer, but only where it is created;
    // this one is the sole content-resize refresh on coarse-pointer viewports.
    const ro = new ResizeObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    });
    ro.observe(content);

    return () => {
      ro.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    // ScrollSmoother's own `effects: true` scan already covered the first route;
    // this effect exists only for the soft navigations after it.
    if (scannedPath.current === pathname) return;
    scannedPath.current = pathname;

    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const smoother = ScrollSmoother.get();
    if (smoother) {
      const target = hashTarget();
      if (target) {
        smoother.scrollTo(target, true, "top top");
      } else {
        smoother.scrollTo(0, false);
      }
    }

    const content = contentRef.current;
    if (!smoother || !content) return () => clearTimeout(timeoutId);

    const registered = smoother.effects();
    const targets = Array.from(
      content.querySelectorAll<HTMLElement>(EFFECT_TARGETS),
    );
    if (registered.length === 0 && targets.length === 0)
      return () => clearTimeout(timeoutId);

    for (const effect of registered) {
      effect.kill();
    }
    if (targets.length > 0) {
      smoother.effects(targets);
    }

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return (
    <>
      <MountSmootherBeforeSiblings />
      {chrome}
      <div id={WRAPPER_ID} ref={wrapperRef}>
        <div id={CONTENT_ID} ref={contentRef}>
          {children}
        </div>
      </div>
    </>
  );
}
