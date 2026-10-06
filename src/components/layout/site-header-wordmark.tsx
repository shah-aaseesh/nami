import Image from "next/image";
import { cn } from "@/lib/utils";

const MARK_SRC = "/logos/brand/nami-color.svg";
const MARK_WIDTH = 200;
const MARK_HEIGHT = 200;

export type SiteHeaderWordmarkProps = {
  name: string;
  scrolled?: boolean;
  className?: string;
  src?: string;
};

function getWordmarkSizeClasses(src: string, scrolled: boolean): string {
  if (src.includes("International School") || src.includes("nami-school")) {
    return scrolled
      ? "h-9 sm:h-10 max-w-[180px] sm:max-w-[220px]"
      : "h-11 sm:h-13 lg:h-14 max-w-[210px] sm:max-w-[260px]";
  }
  if (src.includes("nami-college")) {
    return scrolled
      ? "h-10 sm:h-11 max-w-[140px] sm:max-w-[160px]"
      : "h-13 sm:h-15 lg:h-16 max-w-[170px] sm:max-w-[200px]";
  }
  return scrolled ? "h-14 sm:h-16" : "h-18 sm:h-22 lg:h-24";
}

export function SiteHeaderWordmark({
  className,
  name,
  scrolled = false,
  src = MARK_SRC,
}: SiteHeaderWordmarkProps) {
  return (
    <Image
      alt={name}
      className={cn(
        "w-auto transition-[height,max-width] duration-300 object-contain",
        getWordmarkSizeClasses(src, scrolled),
        className,
      )}
      data-slot="wordmark"
      height={MARK_HEIGHT}
      priority
      src={src}
      unoptimized
      width={MARK_WIDTH}
    />
  );
}
