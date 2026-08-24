"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ContentImage } from "@/lib/content";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const BAND_VIDEO_SRC = "/nami-video.mp4";
const VIDEO_PRELOAD_MARGIN = "400px";

export function CampusLifeBand({ poster }: { poster: ContentImage }) {
  const band = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    setPrefersReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) =>
      setPrefersReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // autoPlay makes the browser fetch the media whatever preload asks for, so the element itself is gated rather than lazy-loaded.
  useEffect(() => {
    const element = band.current;
    if (element === null) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setIsNearViewport(true);
        observer.disconnect();
      },
      { rootMargin: VIDEO_PRELOAD_MARGIN },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative h-full w-full" ref={band}>
      <Image
        alt=""
        aria-hidden="true"
        className="h-full w-full object-cover"
        height={poster.height}
        loading="lazy"
        sizes="100vw"
        src={poster.src}
        width={poster.width}
      />
      {isNearViewport && !prefersReducedMotion ? (
        <video
          aria-hidden="true"
          autoPlay
          className="absolute inset-0 h-full w-full object-cover"
          loop
          muted
          playsInline
          src={BAND_VIDEO_SRC}
          tabIndex={-1}
        />
      ) : null}
    </div>
  );
}
