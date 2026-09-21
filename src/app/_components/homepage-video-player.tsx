"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Lock both documentElement and body scroll firmly when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
      };
    }
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

      {/* Expanded Modal Video Lightbox Portal */}
      {mounted &&
        isOpen &&
        createPortal(
          <div
            aria-label="Video Player"
            aria-modal="true"
            className="fixed inset-0 z-[99999] h-[100dvh] w-screen flex flex-col items-center justify-center bg-black/92 backdrop-blur-md p-3 sm:p-6 lg:p-10 overscroll-none touch-none select-none animate-in fade-in duration-200 cursor-zoom-out"
            onClick={() => setIsOpen(false)}
            role="dialog"
          >
            <div
              className="relative w-full max-w-5xl flex flex-col gap-3 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Bar with Title and Close Button */}
              <div className="flex items-center justify-between text-white px-1">
                <span className="rounded-full bg-[#BD1B21] px-3 py-1 font-body text-xs font-semibold text-white tracking-wide shadow-sm">
                  {title}
                </span>
                <button
                  aria-label="Close Video"
                  className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#BD1B21] hover:scale-105 border border-white/20 transition-all cursor-pointer shadow-lg backdrop-blur-md"
                  onClick={() => setIsOpen(false)}
                  type="button"
                >
                  <Icon className="size-5" icon={CloseIcon} />
                </button>
              </div>

              {/* Video Player Container */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/15">
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="size-full border-0"
                  src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&mute=0&controls=1&rel=0&loop=1&playlist=${YOUTUBE_ID}&modestbranding=1&iv_load_policy=3&playsinline=1`}
                  title={title}
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
