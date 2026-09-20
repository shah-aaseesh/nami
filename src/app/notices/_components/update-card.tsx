"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H6 } from "@/components/ui/typography";
import type { ContentLink, Update } from "@/lib/content";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CalendarIcon,
  LocationIcon,
} from "@/lib/icons";
import { institutionLabel } from "@/lib/institution-filter";
import { cn } from "@/lib/utils";
import { noticesCopy, updateKindLabel } from "./notices-copy";
import { isUpcoming } from "./updates-filter";

const fullDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function UpdateCta({ link }: { readonly link: ContentLink }) {
  if (link.destination === "legacy") return null;

  const isExternal = link.destination === "external";

  return (
    <Link
      className={cn(buttonVariants({ size: "md", variant: "outline" }), "mt-5")}
      href={link.href as Route}
      rel={isExternal ? "noopener noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      {link.label}
      <Icon icon={isExternal ? ArrowUpRightIcon : ArrowRightIcon} />
    </Link>
  );
}

function UpdatePlate({ item }: { readonly item: Update }) {
  return (
    <div className="flex h-full flex-col justify-end p-5 sm:p-6 bg-surface-raised">
      <span
        aria-hidden="true"
        className="block border-t border-border-strong pt-4 font-display text-7xl leading-none text-ink-muted text-outline"
      >
        {item.publishedAt.slice(0, 4)}
      </span>
    </div>
  );
}

function FormattedNoticeContent({ text }: { readonly text: string }) {
  const blocks = text.split(/\n\n+/).filter(Boolean);

  return (
    <div className="space-y-4">
      {blocks.map((block, bIdx) => {
        const lines = block
          .split(/\n/)
          .map((l) => l.trim())
          .filter(Boolean);

        const hasBullets = lines.some(
          (l) => l.startsWith("•") || l.startsWith("-"),
        );

        if (hasBullets) {
          const headings: string[] = [];
          const bullets: string[] = [];

          for (const line of lines) {
            if (line.startsWith("•") || line.startsWith("-")) {
              bullets.push(line.replace(/^[•\-]\s*/, ""));
            } else {
              headings.push(line);
            }
          }

          return (
            <div className="space-y-2" key={`block-${bIdx}`}>
              {headings.map((h, hIdx) => (
                <p
                  className="font-medium text-sm text-ink font-body"
                  key={`h-${hIdx}`}
                >
                  {h}
                </p>
              ))}
              <ul className="space-y-2 pl-1">
                {bullets.map((bullet, idx) => (
                  <li
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/85 font-body"
                    key={`b-${idx}`}
                  >
                    <span className="size-1.5 mt-2 shrink-0 rounded-full bg-accent" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        return (
          <p
            className="text-sm leading-relaxed text-ink/85 font-body"
            key={`block-${bIdx}`}
          >
            {block}
          </p>
        );
      })}
    </div>
  );
}

export function UpdateCard({
  item,
  sizes,
  today,
}: {
  readonly item: Update;
  readonly sizes: string;
  readonly today: string;
}) {
  const [open, setOpen] = useState(false);
  const upcoming = isUpcoming(item, today);
  const stamp = item.happensAt ?? item.publishedAt;

  return (
    <>
      <li
        className="group flex flex-col rounded-2xl border border-border/80 bg-surface p-5 sm:p-6 shadow-2xs transition-all duration-300 hover:border-border-strong hover:shadow-md h-full"
        data-update-entry=""
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
          {item.image === null ? (
            <UpdatePlate item={item} />
          ) : (
            <Image
              alt={item.image.alt}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              fill
              loading="lazy"
              sizes={sizes}
              src={item.image.src}
            />
          )}
        </div>

        <div className="mt-5 flex flex-col flex-1">
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <Eyebrow as="span" className="text-accent">
              {upcoming
                ? `${noticesCopy.upcomingLabel} ${updateKindLabel[item.kind].toLowerCase()}`
                : updateKindLabel[item.kind]}
            </Eyebrow>
            {item.institution === null ? null : (
              <Eyebrow as="span" className="text-ink-muted">
                {institutionLabel[item.institution]}
              </Eyebrow>
            )}
          </p>

          <H6 as="h2" className="mt-2.5 line-clamp-2 text-ink">
            {item.title}
          </H6>

          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 font-body text-xs text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <Icon className="size-3.5" icon={CalendarIcon} />
              <time dateTime={stamp}>
                <span className="sr-only">
                  {upcoming
                    ? noticesCopy.upcomingLabel
                    : noticesCopy.publishedLabel}{" "}
                </span>
                {fullDate.format(new Date(stamp))}
              </time>
            </span>

            {item.venue === null ? null : (
              <span className="inline-flex items-center gap-1.5">
                <Icon className="size-3.5" icon={LocationIcon} />
                <span>{item.venue}</span>
              </span>
            )}
          </div>

          {item.excerpt ? (
            <p className="mt-3 text-sm text-ink-muted leading-relaxed line-clamp-3 font-body">
              {item.excerpt}
            </p>
          ) : null}

          <div className="mt-auto pt-5 flex items-center justify-between gap-3 border-t border-border/60">
            {item.excerpt ? (
              <Button
                className="cursor-pointer gap-1 px-0 text-xs font-semibold text-accent hover:text-accent/80 hover:bg-transparent"
                onClick={() => setOpen(true)}
                size="sm"
                type="button"
                variant="ghost"
              >
                <span>Read more</span>
                <span aria-hidden="true">&rarr;</span>
              </Button>
            ) : null}

            {item.link === null ? null : <UpdateCta link={item.link} />}
          </div>
        </div>
      </li>

      {/* Full Notice Modal Dialog */}
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent className="max-w-lg sm:max-w-xl max-h-[85vh] flex flex-col p-6 sm:p-8">
          <div className="flex flex-col pb-4 border-b border-border/70 text-left">
            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <Eyebrow as="span" className="text-accent">
                {upcoming
                  ? `${noticesCopy.upcomingLabel} ${updateKindLabel[item.kind].toLowerCase()}`
                  : updateKindLabel[item.kind]}
              </Eyebrow>
              {item.institution === null ? null : (
                <Eyebrow as="span" className="text-ink-muted">
                  {institutionLabel[item.institution]}
                </Eyebrow>
              )}
            </p>

            <DialogTitle className="mt-2 text-xl font-display font-medium text-ink">
              {item.title}
            </DialogTitle>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-body text-xs text-ink-muted">
              <span className="inline-flex items-center gap-1.5">
                <Icon className="size-3.5" icon={CalendarIcon} />
                <time dateTime={stamp}>
                  {fullDate.format(new Date(stamp))}
                </time>
              </span>

              {item.venue === null ? null : (
                <span className="inline-flex items-center gap-1.5">
                  <Icon className="size-3.5" icon={LocationIcon} />
                  <span>{item.venue}</span>
                </span>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pt-4 pr-1">
            {item.excerpt ? (
              <FormattedNoticeContent text={item.excerpt} />
            ) : null}

            {item.link === null ? null : (
              <div className="mt-6 pt-4 border-t border-border">
                <UpdateCta link={item.link} />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
