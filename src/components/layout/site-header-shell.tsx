"use client";

import type { Route } from "next";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { ChevronDownIcon, MenuIcon, PhoneIcon } from "@/lib/icons";
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

export function SiteHeaderShell({
  call,
  items,
  links,
  places,
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
          "pointer-events-auto border-b transition-colors gutter-x",
          scrolled ? "border-border bg-surface" : "border-transparent",
        )}
        ref={bar}
      >
        <div
          className={cn(
            "mx-auto flex max-w-page items-center justify-between gap-6 transition-[height] duration-300",
            scrolled ? "h-16" : "h-20 lg:h-24",
          )}
        >
          <Link href="/">
            <SiteHeaderWordmark lead={wordmark.lead} tail={wordmark.tail} />
          </Link>

          <nav
            aria-label="Sections"
            className="hidden flex-1 justify-center lg:flex"
          >
            <ul className="flex items-center gap-x-5 xl:gap-x-8">
              {items.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center gap-1 font-body text-sm font-medium text-ink uppercase transition-colors hover:text-accent outline-none">
                        {item.label}{" "}
                        <Icon icon={ChevronDownIcon} className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        className="w-48 bg-surface border border-border"
                      >
                        {item.children.map((child) => (
                          <DropdownMenuItem
                            key={child.label}
                            asChild
                            className="cursor-pointer font-body text-sm text-ink hover:text-accent focus:bg-accent/10 focus:text-accent py-2 px-4 outline-none"
                          >
                            <Link href={child.href as Route}>
                              {child.label}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      className="font-body text-sm font-medium text-ink uppercase transition-colors hover:text-accent"
                      href={item.href as Route}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-x-5">
            {call === null || call.href === null ? null : (
              <Link
                className="hidden items-center gap-x-2 font-body text-sm font-medium text-ink transition-colors hover:text-accent xl:inline-flex"
                href={call.href as Route}
              >
                <Icon className="size-4" icon={PhoneIcon} />
                {call.label}
              </Link>
            )}

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button size="sm" variant="quiet">
                  Menu
                  <Icon icon={MenuIcon} />
                </Button>
              </SheetTrigger>
              <SheetContent
                className="w-full sm:max-w-md lg:max-w-sm flex flex-col outline-none overflow-y-auto px-6 py-6"
                side="right"
              >
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SiteNavPanel
                  items={items}
                  labelId={labelId}
                  links={links}
                  onNavigate={() => setOpen(false)}
                  places={places}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
