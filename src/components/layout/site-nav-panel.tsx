"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { gsap, useGSAP } from "@/lib/gsap";
import {
  FacebookIcon,
  InstagramIcon,
  LocationIcon,
  PhoneIcon,
  TwitterIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";
import { SiteHeaderWordmark } from "./site-header-wordmark";
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
  wordmark: { lead: string; tail: string | null };
  onNavigate: () => void;
};

export function SiteNavPanel({
  items,
  labelId,
  places,
  links,
  wordmark,
  onNavigate,
}: SiteNavPanelProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      gsap.from(container.current.querySelectorAll(".nav-anim-item"), {
        y: 20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.1,
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className="mt-8 flex h-full w-full flex-col">
      {/* Mobile Navigation */}
      <nav aria-labelledby={labelId} className="flex flex-col gap-1 lg:hidden">
        <Accordion className="border-none w-full">
          {items.map((item, index) => (
            <div
              key={item.label}
              className="border-t border-border w-full nav-anim-item"
            >
              {item.children ? (
                <AccordionItem
                  value={item.label}
                  className="border-none w-full"
                >
                  <AccordionTrigger className="py-4 text-xl font-body font-medium w-full text-ink">
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

      {/* Desktop View Content */}
      <div className="hidden lg:flex flex-col items-center text-center nav-anim-item gap-4 pb-4">
        <SiteHeaderWordmark
          lead={wordmark.lead}
          tail={wordmark.tail}
          className="scale-125 my-6"
        />
        <p className="text-sm text-ink-muted leading-relaxed px-4">
          NAMI College provides world-class education with state-of-the-art
          facilities, empowering students to become future leaders and
          innovators.
        </p>

        {/* Banner */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mt-2 shadow-lg">
          <Image
            src="/nami/campus-library.jpg"
            alt="Campus Library"
            fill
            sizes="336px"
            className="absolute inset-0 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 inset-x-6">
            <Link
              href={"/admissions" as Route}
              onClick={onNavigate}
              className={cn(
                buttonVariants(),
                "w-full bg-accent hover:bg-accent/90 text-white border-none shadow-md",
              )}
            >
              Apply Now
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-6 w-full text-left mt-6 border-t border-border pt-10">
          {places.length > 0 && (
            <div className="flex items-start gap-4 text-ink-muted">
              <Icon
                icon={LocationIcon}
                className="size-5 shrink-0 mt-0.5 text-accent"
              />
              <div className="flex flex-col gap-2">
                {places.map((place) => (
                  <span key={place} className="text-sm">
                    {place}
                  </span>
                ))}
              </div>
            </div>
          )}

          {links.length > 0 && (
            <div className="flex items-start gap-4 text-ink-muted">
              <Icon
                icon={PhoneIcon}
                className="size-5 shrink-0 mt-0.5 text-accent"
              />
              <div className="flex flex-col gap-2">
                {links.map((link) =>
                  link.href ? (
                    <Link
                      key={link.label}
                      href={link.href as Route}
                      className="text-sm hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <span key={link.label} className="text-sm text-ink-muted">
                      {link.label}
                    </span>
                  ),
                )}
              </div>
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className="flex flex-col gap-5 w-full mt-8 pb-8">
          <span className="text-xs font-bold text-ink uppercase tracking-widest text-left">
            Follow Us
          </span>
          <div className="flex items-center gap-6">
            <Link
              href={"#" as Route}
              className="flex size-10 items-center justify-center rounded-full bg-neutral-100 text-ink transition-colors hover:bg-accent hover:text-white"
            >
              <Icon icon={FacebookIcon} className="size-5" />
            </Link>
            <Link
              href={"#" as Route}
              className="flex size-10 items-center justify-center rounded-full bg-neutral-100 text-ink transition-colors hover:bg-accent hover:text-white"
            >
              <Icon icon={TwitterIcon} className="size-5" />
            </Link>
            <Link
              href={"#" as Route}
              className="flex size-10 items-center justify-center rounded-full bg-neutral-100 text-ink transition-colors hover:bg-accent hover:text-white"
            >
              <Icon icon={InstagramIcon} className="size-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
