"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface HomepageVideoPlayerProps {
  className?: string;
  poster?: string;
  title?: string;
  src?: string;
}

export function HomepageVideoPlayer({
  className,
  poster = "/Homepage video thumbnails.png",
  title = "NAMI College Video",
  src = "/Final%20First%20Video.mp4",
}: HomepageVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoSrc, setVideoSrc] = useState(src);

  return (
    <div
      className={cn(
        "group relative aspect-video lg:aspect-auto flex-1 min-h-[280px] sm:min-h-[320px] w-full overflow-hidden rounded-2xl border border-border bg-neutral-950 shadow-md select-none",
        className,
      )}
    >
      {isPlaying ? (
        <video
          aria-label={title}
          autoPlay
          className="size-full object-cover"
          controls
          onError={() => {
            if (videoSrc === "/Final%20First%20Video.mp4") {
              setVideoSrc("/Final First Video.mp4");
            } else if (videoSrc !== "/nami-video.mp4") {
              setVideoSrc("/nami-video.mp4");
            }
          }}
          playsInline
          preload="auto"
          src={videoSrc}
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <div
          aria-label="Play video"
          className="relative size-full cursor-pointer"
          onClick={() => setIsPlaying(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsPlaying(true);
            }
          }}
          role="button"
          tabIndex={0}
        >
          {/* Background Poster Image */}
          <Image
            alt={title}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            src={poster}
          />

          {/* Vignette Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

          {/* Central Circular Play Button */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <button
              aria-label="Play video"
              className="relative flex size-16 sm:size-20 items-center justify-center rounded-full bg-red-600 text-white shadow-2xl shadow-red-600/50 transition-all duration-300 group-hover:scale-110 group-hover:bg-red-500 group-active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-400 cursor-pointer"
              type="button"
            >
              <svg
                aria-hidden="true"
                className="size-7 sm:size-8 translate-x-0.5 fill-white text-white"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
