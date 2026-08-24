"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { usePinnedCards } from "@/hooks/motion/use-pinned-cards";

export function CollegeCambridgeStack({
  children,
  className,
}: {
  readonly children: ReactNode;
  readonly className?: string;
}) {
  const stack = useRef<HTMLUListElement>(null);

  usePinnedCards(stack);

  return (
    <ul className={className} ref={stack}>
      {children}
    </ul>
  );
}
