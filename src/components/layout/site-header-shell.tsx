"use client";

import type { Route } from "next";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { gsap, ScrollSmoother, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { CloseIcon, MenuIcon, PhoneIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { SiteHeaderWordmark } from "./site-header-wordmark";
import {
  type SiteMetaLink,
  type SiteNavItem,
  SiteNavPanel,
} from "./site-nav-panel";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
const SCROLLED_AT = 24;
const SMOOTH_WRAPPER = "smooth-wrapper";
const HIDE_DURATION = 0.2;

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
  const toggle = useRef<HTMLButtonElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const showAnim = useRef<gsap.core.Tween | null>(null);
  const openRef = useRef(open);
  const panelId = useId();
  const labelId = useId();

  const close = useCallback(() => {
    setOpen(false);
    toggle.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLLED_AT);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const smoother = ScrollSmoother.get();
    smoother?.paused(true);
    const html = document.documentElement;
    const restore = html.style.overflow;
    html.style.overflow = "hidden";
    const wrapper = document.getElementById(SMOOTH_WRAPPER);
    wrapper?.setAttribute("inert", "");

    return () => {
      wrapper?.removeAttribute("inert");
      html.style.overflow = restore;
      smoother?.paused(false);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const el = root.current;
      if (el === null) return;

      const stops = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = stops.at(0);
      const last = stops.at(-1);
      if (first === undefined || last === undefined) return;

      const active = document.activeElement;
      if (!(active instanceof HTMLElement) || !el.contains(active)) {
        event.preventDefault();
        first.focus();
        return;
      }
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
        return;
      }
      if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [close, open]);

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
            if (self.direction === -1) {
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
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-50 flex flex-col",
        open && "field-ink pointer-events-auto bottom-0",
      )}
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
          "border-b border-transparent transition-colors gutter-x",
          scrolled && !open && "pointer-events-auto border-border bg-surface",
          open && "pointer-events-auto",
        )}
        ref={bar}
      >
        <div
          className={cn(
            "mx-auto flex max-w-page items-center justify-between gap-6 transition-[height] duration-300",
            scrolled && !open ? "h-16" : "h-20",
          )}
        >
          <Link
            className="pointer-events-auto"
            href="/"
            onClick={open ? close : undefined}
          >
            <SiteHeaderWordmark lead={wordmark.lead} tail={wordmark.tail} />
          </Link>

          {open ? null : (
            <nav
              aria-label="Sections"
              className="pointer-events-auto hidden flex-1 justify-center lg:flex"
            >
              <ul className="flex items-center gap-x-5 xl:gap-x-8">
                {items.map((item) => (
                  <li key={item.hash}>
                    <Link
                      className="font-body text-sm font-medium text-ink uppercase transition-colors hover:text-accent"
                      href={item.hash as Route}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="flex items-center gap-x-5">
            {open || call === null || call.href === null ? null : (
              <Link
                className="pointer-events-auto hidden items-center gap-x-2 font-body text-sm font-medium text-ink transition-colors hover:text-accent xl:inline-flex"
                href={call.href as Route}
              >
                <Icon className="size-4" icon={PhoneIcon} />
                {call.label}
              </Link>
            )}

            <Button
              aria-controls={open ? panelId : undefined}
              aria-expanded={open}
              className="pointer-events-auto"
              onClick={() => (open ? close() : setOpen(true))}
              ref={toggle}
              size="sm"
              variant="quiet"
            >
              {open ? "Close" : "Menu"}
              <Icon icon={open ? CloseIcon : MenuIcon} />
            </Button>
          </div>
        </div>
      </div>

      {open ? (
        <SiteNavPanel
          id={panelId}
          items={items}
          labelId={labelId}
          links={links}
          onNavigate={close}
          places={places}
        />
      ) : null}
    </header>
  );
}
