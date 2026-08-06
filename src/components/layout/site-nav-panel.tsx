"use client";

import type { Route } from "next";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { H3, P } from "@/components/ui/typography";
import { gsap, matchMotion, useGSAP } from "@/lib/gsap";

export type SiteNavItem = {
  readonly hash: string;
  readonly label: string;
  readonly descriptor: string | null;
};

export type SiteMetaLink = {
  readonly label: string;
  readonly href: string | null;
  readonly external: boolean;
};

export type SiteNavPanelProps = {
  id: string;
  labelId: string;
  items: readonly SiteNavItem[];
  places: readonly string[];
  links: readonly SiteMetaLink[];
  onNavigate: () => void;
};

export function SiteNavPanel({
  id,
  items,
  labelId,
  links,
  onNavigate,
  places,
}: SiteNavPanelProps) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    root.current?.focus({ preventScroll: true });
  }, []);

  useGSAP(
    () =>
      matchMotion(
        {
          motion: () => {
            gsap.from("[data-nav-row]", {
              y: 40,
              opacity: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.08,
            });
            gsap.from("[data-nav-meta]", {
              y: 40,
              opacity: 0,
              duration: 0.9,
              delay: 0.25,
              ease: "power3.out",
              stagger: 0.08,
            });
          },
        },
        root,
      ),
    { scope: root },
  );

  return (
    <div
      aria-labelledby={labelId}
      className="flex min-h-0 flex-1 flex-col overflow-y-auto pb-16 outline-none gutter-x"
      id={id}
      ref={root}
      role="dialog"
      tabIndex={-1}
    >
      <div className="mx-auto flex w-full max-w-page flex-1 flex-col">
        <span className="sr-only" id={labelId}>
          Sections
        </span>

        <nav aria-labelledby={labelId} className="lg:w-7/12">
          <ul>
            {items.map((item, index) => (
              <li className="border-t" key={item.hash}>
                <Link
                  className="group flex items-baseline gap-x-6 py-6 lg:py-7"
                  data-nav-row=""
                  href={item.hash as Route}
                  onClick={onNavigate}
                >
                  <span className="w-10 shrink-0 font-body text-sm text-ink-muted tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex flex-1 flex-col gap-y-2 lg:flex-row lg:items-baseline lg:gap-x-10">
                    <H3
                      as="span"
                      className="block flex-1 transition-colors group-hover:text-accent motion-reduce:transition-none"
                    >
                      {item.label}
                    </H3>
                    {item.descriptor === null ? null : (
                      <P as="span" className="block lg:w-5/12">
                        {item.descriptor}
                      </P>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-16 flex flex-col gap-10 sm:flex-row lg:mt-auto lg:ms-auto lg:w-4/12 lg:flex-col lg:pt-24">
          {places.length === 0 ? null : (
            <ul className="flex flex-col gap-2" data-nav-meta="">
              {places.map((place) => (
                <li className="font-body text-sm text-ink-muted" key={place}>
                  {place}
                </li>
              ))}
            </ul>
          )}

          {links.length === 0 ? null : (
            <ul className="flex flex-col gap-2" data-nav-meta="">
              {links.map((link) => (
                <li key={link.label}>
                  {link.href === null ? (
                    <span className="font-body text-sm text-ink-muted">
                      {link.label}
                    </span>
                  ) : (
                    <Link
                      className="font-body text-sm text-ink underline decoration-1 underline-offset-4 hover:decoration-2"
                      href={link.href as Route}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      target={link.external ? "_blank" : undefined}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
