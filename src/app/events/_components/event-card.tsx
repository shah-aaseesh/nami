import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { RevealItem } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { H5, P } from "@/components/ui/typography";
import type { ContentLink, Update, UpdateKind } from "@/lib/content";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CalendarIcon,
  LocationIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";

const KIND_LABEL: Record<UpdateKind, string> = {
  event: "Event",
  news: "News",
  notice: "Notice",
};

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function EventCta({ link }: { link: ContentLink }) {
  if (link.destination === "legacy") return null;

  const isExternal = link.destination === "external";

  return (
    <Link
      className={cn(buttonVariants({ size: "sm", variant: "link" }), "mt-auto")}
      href={link.href as Route}
      rel={isExternal ? "noopener noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      {link.label}
      <Icon icon={isExternal ? ArrowUpRightIcon : ArrowRightIcon} />
    </Link>
  );
}

export function EventCard({ item }: { item: Update }) {
  return (
    <RevealItem className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-raised transition-shadow duration-300 hover:shadow-lg">
        {/* Image area — always present */}
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-muted">
          {item.image !== null ? (
            <Image
              alt={item.image.alt}
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              height={item.image.height}
              loading="lazy"
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
              src={item.image.src}
              width={item.image.width}
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-muted">
              <svg
                className="size-12 text-ink-muted/30"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.2}
                viewBox="0 0 24 24"
              >
                <title>Event image placeholder</title>
                <rect height="14" rx="2" width="18" x="3" y="5" />
                <path d="M3 10h18M8 5V3m8 2V3" />
              </svg>
            </div>
          )}

          {/* Kind badge */}
          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 font-body text-xs font-medium text-accent-ink">
            {KIND_LABEL[item.kind]}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-body text-xs text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <Icon className="size-3.5" icon={CalendarIcon} />
              <time dateTime={item.publishedAt}>
                {dateFormat.format(new Date(item.publishedAt))}
              </time>
            </span>
            {item.venue === null ? null : (
              <span className="inline-flex items-center gap-1.5">
                <Icon className="size-3.5" icon={LocationIcon} />
                {item.venue}
              </span>
            )}
          </div>

          {/* Title */}
          <H5
            as="h3"
            className="mt-3 line-clamp-2 text-ink transition-colors group-hover:text-accent"
          >
            {item.title}
          </H5>

          {/* Excerpt */}
          <P className="mt-2 line-clamp-3 text-sm">{item.excerpt}</P>

          {/* CTA */}
          {item.link === null ? null : (
            <div className="mt-4">
              <EventCta link={item.link} />
            </div>
          )}
        </div>
      </article>
    </RevealItem>
  );
}
