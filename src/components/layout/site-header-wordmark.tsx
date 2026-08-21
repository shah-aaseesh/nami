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
        "w-auto transition-[height] duration-300",
        scrolled ? "h-16" : "h-18 lg:h-20",
        className,
      )}
      data-slot="wordmark"
      height={MARK_HEIGHT}
      loading="eager"
      sizes="(min-width: 1024px) 80px, 64px"
      src={MARK_SRC}
      width={MARK_WIDTH}
    />
  );
}
