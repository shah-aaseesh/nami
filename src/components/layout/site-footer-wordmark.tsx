import Image from "next/image";
import { cn } from "@/lib/utils";

const MARK_SRC = "/logo.png";
const MARK_WIDTH = 176;
const MARK_HEIGHT = 132;

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
        className="h-20 w-auto"
        height={MARK_HEIGHT}
        sizes="128px"
        src={MARK_SRC}
        width={MARK_WIDTH}
      />
    </h2>
  );
}
