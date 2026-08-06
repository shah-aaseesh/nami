import type { ReactNode } from "react";

export type ParallaxProps = {
  children: ReactNode;
  className?: string;
  speed?: number | "auto";
  lag?: number;
};

export function Parallax({
  children,
  className,
  speed = 0.85,
  lag,
}: ParallaxProps) {
  return (
    <div className={className} data-lag={lag} data-speed={speed}>
      {children}
    </div>
  );
}
