import Image from "next/image";
import { cn } from "@/lib/utils";

const MARK_SRC = "/logo/nami-white.svg";
const MARK_WIDTH = 200;
const MARK_HEIGHT = 200;

export type SiteFooterWordmarkProps = {
  name: string;
  className?: string;
};

export function SiteFooterWordmark({
  className,
  name,
}: SiteFooterWordmarkProps) {
  return (
    <h2 className={cn(className)} data-slot="wordmark">
      <Image
        alt={name}
        className="h-20 w-auto lg:h-28"
        height={MARK_HEIGHT}
        sizes="(min-width: 1024px) 112px, 80px"
        src={MARK_SRC}
        width={MARK_WIDTH}
      />
    </h2>
  );
}
