"use client";

import type { Route } from "next";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";

import { Icon } from "@/components/ui/icon";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { ChevronDownIcon, CloseIcon, MenuIcon, PhoneIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { SiteHeaderWordmark } from "./site-header-wordmark";
import { type SiteMetaLink, SiteNavPanel } from "./site-nav-panel";
import type { SiteNavItem } from "./site-nav-sections";

const HIDE_AFTER = 96;
const HIDE_DURATION = 0.2;
const SCROLLED_AT = 24;

export type SiteHeaderShellProps = {
  wordmark: { lead: string; tail: string | null };
  items: readonly SiteNavItem[];
  places: readonly string[];
  links: readonly SiteMetaLink[];
  call: SiteMetaLink | null;
};

function DesktopNavDropdown({ item }: { item: SiteNavItem }) {
  const container = useRef<HTMLLIElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);
  const icon = useRef<SVGSVGElement>(null);
  const [hovered, setHovered] = useState(false);
  const hoverAnim = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      if (!dropdown.current || !icon.current) return;

      // Set initial state
      gsap.set(dropdown.current, { autoAlpha: 0, y: -10, display: "none" });

      // Create a timeline that can be played forward/backward
      const tl = gsap
        .timeline({ paused: true })
        .to(
          dropdown.current,
          {
            autoAlpha: 1,
            y: 0,
            display: "block",
            duration: 0.2,
            ease: "power2.out",
          },
          0,
        )
        .to(
          icon.current,
          {
            rotation: 180,
            duration: 0.2,
            ease: "power2.out",
          },
          0,
        );

      hoverAnim.current = tl;

      return () => {
        tl.kill();
        hoverAnim.current = null;
      };
    },
    { scope: container },
  );

  useEffect(() => {
    if (hoverAnim.current) {
      if (hovered) hoverAnim.current.play();
      else hoverAnim.current.reverse();
    }
  }, [hovered]);

  return (
    <li
      ref={container}
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={item.href as Route}
        className="flex items-center gap-1 font-body text-xs xl:text-sm font-medium text-ink uppercase transition-colors hover:text-accent outline-none cursor-pointer whitespace-nowrap"
      >
        {item.label}{" "}
        <Icon ref={icon} icon={ChevronDownIcon} className="size-4 shrink-0" />
      </Link>

      <div
        ref={dropdown}
        className="absolute top-full left-0 pt-4 w-48 invisible"
      >
        <div className="bg-surface shadow-lg rounded-md p-1.5 flex flex-col gap-1">
          {item.children?.map((child) => (
            <Link
              key={child.label}
              href={child.href as Route}
              className="font-body text-sm text-ink hover:text-accent hover:bg-accent/5 focus:bg-accent/10 focus:text-accent py-2 px-3 rounded-sm transition-colors block"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </li>
  );
}

export function SiteHeaderShell({
  call,
  items,
  places,
  links,
  wordmark,
}: SiteHeaderShellProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const root = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const showAnim = useRef<gsap.core.Tween | null>(null);
  const openRef = useRef(open);
  const labelId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLLED_AT);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    openRef.current = open;
    if (open) showAnim.current?.progress(1);
  }, [open]);

  useGSAP(
    () => {
      const barEl = bar.current;
      if (barEl === null) return;

      const tween = gsap
        .from(barEl, {
          yPercent: -100,
          paused: true,
          duration: HIDE_DURATION,
        })
        .progress(1);
      showAnim.current = tween;

      let trigger: ScrollTrigger | undefined;

      const frame = requestAnimationFrame(() => {
        trigger = ScrollTrigger.create({
          start: "top top",
          end: "max",
          onUpdate: (self) => {
            if (openRef.current) {
              tween.progress(1);
              return;
            }
            if (self.direction === -1 || self.scroll() < HIDE_AFTER) {
              tween.play();
            } else {
              tween.reverse();
            }
          },
        });
      });

      return () => {
        cancelAnimationFrame(frame);
        trigger?.kill();
        showAnim.current = null;
      };
    },
    { scope: root },
  );

  return (
    <header
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex flex-col"
      ref={root}
    >
      {open ? null : (
        <Link
          className={cn(
            buttonVariants({ size: "sm" }),
            "pointer-events-none fixed top-4 left-4 z-10 opacity-0 transition-opacity focus:pointer-events-auto focus:opacity-100",
          )}
          href={"#main" as Route}
        >
          Skip to content
        </Link>
      )}

      <div
        className={cn(
          "pointer-events-auto border-b transition-colors gutter-x bg-surface",
          scrolled ? "border-border" : "border-transparent",
        )}
        ref={bar}
      >
        <div
          className={cn(
            "mx-auto flex max-w-page items-center justify-between gap-6 transition-[height] duration-300",
            scrolled ? "h-16" : "h-20 lg:h-24",
          )}
        >
          <Link href="/" className="flex items-center h-full shrink-0">
            <SiteHeaderWordmark lead={wordmark.lead} tail={wordmark.tail} />
          </Link>

          <nav
            aria-label="Sections"
            className="hidden flex-1 justify-end lg:flex"
          >
            <ul className="flex items-center gap-x-3 lg:gap-x-4 xl:gap-x-6 2xl:gap-x-8">
              {items.map((item) =>
                item.children ? (
                  <DesktopNavDropdown key={item.label} item={item} />
                ) : (
                  <li key={item.label}>
                    <Link
                      className="font-body text-xs xl:text-sm font-medium text-ink uppercase transition-colors hover:text-accent whitespace-nowrap"
                      href={item.href as Route}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-x-3 xl:gap-x-5 shrink-0">
            {call === null || call.href === null ? null : (
              <Link
                className="hidden items-center gap-x-2 font-body text-xs xl:text-sm font-medium text-ink transition-colors hover:text-accent whitespace-nowrap xl:inline-flex"
                href={call.href as Route}
              >
                <Icon className="size-4 shrink-0" icon={PhoneIcon} />
                {call.label}
              </Link>
            )}

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <Button
                    size="sm"
                    variant="quiet"
                    className="border border-border-strong rounded-md px-4 flex items-center justify-center gap-2"
                  >
                    Menu
                    <Icon icon={MenuIcon} className="size-4" />
                  </Button>
                }
              />
              <SheetContent
                className="w-full sm:max-w-md lg:max-w-sm flex flex-col outline-none overflow-y-auto p-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                side="right"
                hideClose
              >
                <SheetClose className="absolute top-0 left-0 bg-accent text-white p-3 hover:bg-accent/90 transition-colors cursor-pointer z-10 flex items-center justify-center">
                  <Icon icon={CloseIcon} className="size-6" />
                  <span className="sr-only">Close</span>
                </SheetClose>
                <div className="px-6 pb-6 pt-16 lg:py-10 h-full w-full flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <SiteNavPanel
                    items={items}
                    labelId={labelId}
                    places={places}
                    links={links}
                    wordmark={wordmark}
                    onNavigate={() => setOpen(false)}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
