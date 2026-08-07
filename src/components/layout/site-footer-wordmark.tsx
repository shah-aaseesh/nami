import Image from "next/image";
import { cn } from "@/lib/utils";

const MARK_SRC = "/logo.png";
const MARK_WIDTH = 176;
const MARK_HEIGHT = 132;

export type SiteFooterWordmarkProps = {
  lead: string;
  tail: string | null;
  className?: string;
};

export function SiteFooterWordmark({
  className,
  lead,
  tail,
}: SiteFooterWordmarkProps) {
  return (
    <h2 className={cn(className)} data-slot="wordmark">
      <Image
        alt={tail === null ? lead : `${lead} ${tail}`}
        className="h-20 w-auto"
        height={MARK_HEIGHT}
        sizes="128px"
        src={MARK_SRC}
        width={MARK_WIDTH}
      />
    </h2>
  );
}
