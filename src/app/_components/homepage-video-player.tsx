"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { PlayIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface HomepageVideoPlayerProps {
  className?: string;
  src: string;
  poster: string;
  title?: string;
}

export function HomepageVideoPlayer({
  className,
  src,
  poster,
  title = "NAMI Video",
}: HomepageVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div
      className={cn(
        "group relative aspect-video lg:aspect-auto flex-1 min-h-[280px] sm:min-h-[320px] w-full overflow-hidden rounded-2xl border border-border bg-neutral-950 shadow-md cursor-pointer select-none",
        className,
      )}
      onClick={!isPlaying ? handlePlay : undefined}
    >
      <video
        ref={videoRef}
        className="size-full object-cover"
        controls={isPlaying}
        playsInline
        preload="metadata"
        poster={poster}
        src={src}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        <track kind="captions" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Thumbnail & Play Button (visible when not playing) */}
      {!isPlaying && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 backdrop-blur-[1px] transition-all duration-300 group-hover:bg-black/30">
          {/* Background Poster Image */}
          <Image
            src={poster}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            priority
          />

          {/* Vignette Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

          {/* Central Circular Play Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePlay();
            }}
            aria-label="Play video"
            className="relative z-20 flex size-16 sm:size-20 items-center justify-center rounded-full bg-red-600 text-white shadow-2xl shadow-red-600/50 transition-all duration-300 group-hover:scale-110 group-hover:bg-red-500 group-active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-400"
          >
            {/* SVG Triangle Play Icon */}
            <svg
              className="size-7 sm:size-8 translate-x-0.5 fill-white text-white"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
