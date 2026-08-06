"use client";

import type { Route } from "next";
import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { H3, P } from "@/components/ui/typography";
import type { SiteNavItem } from "./site-nav-sections";

export type SiteMetaLink = {
  readonly label: string;
  readonly href: string | null;
  readonly external: boolean;
};

export type SiteNavPanelProps = {
  labelId: string;
  items: readonly SiteNavItem[];
  places: readonly string[];
  links: readonly SiteMetaLink[];
  onNavigate: () => void;
};

export function SiteNavPanel({
  items,
  labelId,
  links,
  onNavigate,
  places,
}: SiteNavPanelProps) {
  return (
    <div className="mt-8 flex h-full w-full flex-col">
      {/* Mobile Navigation */}
      <nav aria-labelledby={labelId} className="flex flex-col gap-1 lg:hidden">
        <Accordion className="border-none w-full">
          {items.map((item, index) => (
            <div key={item.label} className="border-t border-border w-full">
              {item.children ? (
                <AccordionItem
                  value={item.label}
                  className="border-none w-full"
                >
                  <AccordionTrigger className="py-4 text-xl font-medium w-full !text-ink">
                    <span className="flex items-baseline gap-4 w-full">
                      <span className="w-6 shrink-0 font-body text-sm text-ink-muted tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </span>
                  </AccordionTrigger>
                  <AccordionPanel className="pl-10">
                    <div className="flex flex-col gap-4 mt-2 mb-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href as Route}
                          onClick={onNavigate}
                          className="text-lg text-ink-muted hover:text-accent transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </AccordionPanel>
                </AccordionItem>
              ) : (
                <Link
                  href={item.href as Route}
                  onClick={onNavigate}
                  className="flex items-center gap-4 py-4 text-xl font-medium transition-colors hover:text-accent w-full group"
                >
                  <span className="w-6 shrink-0 font-body text-sm text-ink-muted tabular-nums group-hover:text-accent transition-colors">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </Accordion>
      </nav>

      {/* Desktop Advertisement Banner */}
      <div className="hidden lg:flex flex-col gap-6 justify-center bg-surface-muted/50 p-8 rounded-xl border border-border">
        <H3>Admissions Open for 2026</H3>
        <P>
          Join NAMI College and unlock your potential with world-class UK
          degrees.
        </P>
        <Link
          href={"/admissions" as Route}
          onClick={onNavigate}
          className={buttonVariants({ className: "w-full" })}
        >
          Apply Now
        </Link>
      </div>

      <div className="mt-16 flex flex-col gap-10 lg:mt-auto border-t border-border pt-8">
        {places.length === 0 ? null : (
          <ul className="flex flex-col gap-2">
            {places.map((place) => (
              <li className="font-body text-sm text-ink-muted" key={place}>
                {place}
              </li>
            ))}
          </ul>
        )}

        {links.length === 0 ? null : (
          <ul className="flex flex-col gap-2">
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
  );
}
