"use client";

import type { ContentImage } from "@/lib/content";
import Image from "next/image";
import { useRef } from "react";

const BAND_VIDEO_SRC = "/nami-video.mp4";

export function CampusLifeBand({ poster }: { poster: ContentImage }) {
  const band = useRef<HTMLDivElement>(null);

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
    </div>
  );
}
