import Image from "next/image";
import { cn } from "@/lib/utils";

const MARK_SRC = "/logo.png";
const MARK_WIDTH = 176;
const MARK_HEIGHT = 132;

export type SiteHeaderWordmarkProps = {
  name: string;
  className?: string;
};

export function SiteHeaderWordmark({
  className,
  name,
}: SiteHeaderWordmarkProps) {
  return (
    <Image
      alt={name}
      className={cn("h-14 w-auto", className)}
      data-slot="wordmark"
      height={MARK_HEIGHT}
      loading="eager"
      sizes="64px"
      src={MARK_SRC}
      width={MARK_WIDTH}
    />
  );
}
