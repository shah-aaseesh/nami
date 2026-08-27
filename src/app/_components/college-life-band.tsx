"use client";

import Image from "next/image";
import { useRef } from "react";
import type { ContentImage } from "@/lib/content";

const BAND_VIDEO_SRC = "/nami-video.mp4";

export function CollegeLifeBand({ poster }: { poster: ContentImage }) {
  const band = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative aspect-video sm:aspect-[16/10] lg:aspect-auto lg:h-full min-h-[260px] w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl border border-white/10"
      ref={band}
    >
      <Image
        alt=""
        aria-hidden="true"
        className="h-full w-full object-cover scale-110"
        height={poster.height}
        loading="lazy"
        sizes="(max-width: 1023px) 100vw, 45vw"
        src={poster.src}
        width={poster.width}
      />

      <video
        aria-hidden="true"
        autoPlay
        className="absolute inset-0 h-full w-full object-cover scale-[1.18]"
        loop
        muted
        playsInline
        src={BAND_VIDEO_SRC}
        tabIndex={-1}
      />
    </div>
  );
}
