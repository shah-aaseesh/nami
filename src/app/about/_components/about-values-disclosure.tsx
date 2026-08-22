"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollTrigger } from "@/lib/gsap";

const PANEL_VALUE = "five-petals";
const REFRESH_DELAY_MS = 400;

export function AboutValuesDisclosure({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<string[]>([]);
  const refreshTimer = useRef<number | null>(null);
  const isOpen = value.includes(PANEL_VALUE);

  useEffect(
    () => () => {
      if (refreshTimer.current !== null) {
        window.clearTimeout(refreshTimer.current);
      }
    },
    [],
  );

  function handleValueChange(next: string[]) {
    setValue(next);

    // Opening/closing resizes everything below, so ScrollTrigger's start
    // positions further down the page go stale until recalculated.
    if (refreshTimer.current !== null) {
      window.clearTimeout(refreshTimer.current);
    }
    refreshTimer.current = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, REFRESH_DELAY_MS);
  }

  return (
    <Accordion
      className="border-t-0"
      onValueChange={handleValueChange}
      value={value}
    >
      <AccordionItem className="border-b-0" value={PANEL_VALUE}>
        <AccordionTrigger className="justify-end gap-2">
          <span>
            {isOpen ? "Show less" : "Read more"}
            <span className="sr-only">
              {" "}
              about the five petals and the values they carry
            </span>
          </span>
        </AccordionTrigger>
        <AccordionPanel className="pt-8 pb-0 pe-0 text-ink" hiddenUntilFound>
          {children}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
