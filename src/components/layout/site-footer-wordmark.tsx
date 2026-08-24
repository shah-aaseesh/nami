import Image from "next/image";
import { cn } from "@/lib/utils";

const MARK_SRC = "/logo/nami-white.svg";
const MARK_WIDTH = 800;
const MARK_HEIGHT = 465;

export type SiteFooterWordmarkProps = {
  name: string;
  className?: string;
};

export function SiteFooterWordmark({
  className,
  name,
}: SiteFooterWordmarkProps) {
  return (
    <div className={cn("inline-block", className)} data-slot="wordmark">
      <Image
        alt={name}
        className="h-20 w-auto md:h-24 lg:h-28 -mt-6"
        height={MARK_HEIGHT}
        sizes="(min-width: 1024px) 112px, 80px"
        src={MARK_SRC}
        width={MARK_WIDTH}
      />
    </div>
  );
}
