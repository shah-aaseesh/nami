import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Measure = "prose" | "wide";

const MEASURE: Record<Measure, string> = {
  prose: "max-w-xl",
  wide: "max-w-3xl",
};

export type DocumentRowProps = {
  children: ReactNode;
  className?: string;
  measure?: Measure;
  rail?: ReactNode;
};

export function DocumentRow({
  children,
  className,
  measure = "prose",
  rail,
}: DocumentRowProps) {
  return (
    <div
      className={cn(
        "lg:grid lg:grid-cols-[9rem_minmax(0,1fr)] lg:gap-x-12 xl:grid-cols-[12rem_minmax(0,1fr)] xl:gap-x-20",
        className,
      )}
    >
      {rail === undefined ? (
        <div aria-hidden="true" className="hidden lg:block" />
      ) : (
        <div className="mb-4 lg:mb-0 lg:pt-3">{rail}</div>
      )}
      <div className={MEASURE[measure]}>{children}</div>
    </div>
  );
}
