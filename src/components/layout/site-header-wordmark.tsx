import Image from "next/image";
import { cn } from "@/lib/utils";

const MARK_SRC = "/logo/nami-color.svg";
const MARK_WIDTH = 200;
const MARK_HEIGHT = 200;

export type SiteHeaderWordmarkProps = {
  name: string;
  scrolled?: boolean;
  className?: string;
};

export function SiteHeaderWordmark({
  className,
  name,
  scrolled = false,
}: SiteHeaderWordmarkProps) {
  return (
    <Image
      alt={name}
      className={cn(
        "w-auto transition-[height] duration-300 object-contain",
        scrolled ? "h-14 sm:h-16" : "h-18 sm:h-22 lg:h-24",
        className,
      )}
      data-slot="wordmark"
      height={MARK_HEIGHT}
      loading="eager"
      sizes="(min-width: 1024px) 120px, 90px"
      src={MARK_SRC}
      width={MARK_WIDTH}
    />
  );
}
