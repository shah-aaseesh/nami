"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ContentImage } from "@/lib/content";

const YOUTUBE_ID = "XW2vMPwdPg8";

export function CollegeLifeBand({ poster }: { poster: ContentImage }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="relative aspect-video sm:aspect-[16/10] lg:aspect-auto lg:h-full min-h-[260px] w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl border border-white/10 bg-neutral-950"
      ref={containerRef}
    >
      <Image
        alt=""
        aria-hidden="true"
        className="h-full w-full object-cover scale-105"
        height={poster.height}
        loading="lazy"
        sizes="(max-width: 1023px) 100vw, 45vw"
        src={poster.src}
        width={poster.width}
      />

      {isInView && (
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] pointer-events-none object-cover border-0"
          src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&fs=0`}
          tabIndex={-1}
          title="Campus Life Video"
        />
      )}
    </div>
  );
}
