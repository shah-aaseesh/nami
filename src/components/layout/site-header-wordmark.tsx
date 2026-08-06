import Image from "next/image";
import { cn } from "@/lib/utils";

const MARK_SRC = "/nami/nami-college-logo.png";
const MARK_WIDTH = 528;
const MARK_HEIGHT = 396;

export type SiteHeaderWordmarkProps = {
  lead: string;
  tail: string | null;
  onInk?: boolean;
  className?: string;
};

function Lockup({ className, lead, tail }: SiteHeaderWordmarkProps) {
  return (
    <span
      className={cn("inline-flex flex-col justify-center", className)}
      data-slot="wordmark"
    >
      <span className="font-display text-2xl font-semibold leading-none lowercase">
        {lead}
      </span>
      {tail === null ? null : (
        <span className="mt-1.5 font-body text-xs font-medium leading-none tracking-widest text-ink-muted uppercase">
          {tail}
        </span>
      )}
    </span>
  );
}

export function SiteHeaderWordmark({
  className,
  lead,
  onInk = false,
  tail,
}: SiteHeaderWordmarkProps) {
  if (onInk) return <Lockup className={className} lead={lead} tail={tail} />;

  return (
    <Image
      alt={tail === null ? lead : `${lead} ${tail}`}
      className={cn("h-11 w-auto", className)}
      data-slot="wordmark"
      height={MARK_HEIGHT}
      loading="eager"
      sizes="64px"
      src={MARK_SRC}
      width={MARK_WIDTH}
    />
  );
}
