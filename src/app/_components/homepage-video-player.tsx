"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { CloseIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const YOUTUBE_ID = "1FRj-NAHfoo";

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
}: HomepageVideoPlayerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div
        aria-label="Play video in expanded player"
        className={cn(
          "group relative aspect-video lg:aspect-auto flex-1 min-h-[280px] sm:min-h-[320px] w-full overflow-hidden rounded-2xl border border-border bg-neutral-950 shadow-md cursor-pointer select-none",
          className,
        )}
        onClick={() => setIsOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setIsOpen(true);
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

      {/* Expanded Modal Video Lightbox */}
      {isOpen && (
        <div
          aria-label="Video Player"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 lg:p-10 animate-fade-in"
          onClick={() => setIsOpen(false)}
          role="dialog"
        >
          <div
            className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl ring-1 ring-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              aria-label="Close Video"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex size-9 sm:size-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90 hover:scale-105 border border-white/20 transition-all cursor-pointer shadow-lg"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              <Icon className="size-5" icon={CloseIcon} />
            </button>

            {/* Embedded YouTube Player */}
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="size-full border-0"
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1`}
              title={title}
            />
          </div>
        </div>
      )}
    </>
  );
}
