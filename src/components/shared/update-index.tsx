import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H3, H4, P } from "@/components/ui/typography";
import type { ContentLink, IsoDate, Update, UpdateKind } from "@/lib/content";
import { ArrowRightIcon, ArrowUpRightIcon, LocationIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const KIND_LABEL: Record<UpdateKind, string> = {
  event: "Event",
  news: "News",
  notice: "Notice",
};

const dayMonthFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
});

function yearOf(value: IsoDate): string {
  return value.slice(0, 4);
}

export function yearSpan(items: readonly Update[]): string | null {
  const years = [...new Set(items.map((item) => yearOf(item.publishedAt)))];
  const latest = years.at(0);
  const earliest = years.at(-1);
  if (latest === undefined || earliest === undefined) return null;
  return latest === earliest ? latest : `${earliest}–${latest}`;
}

function UpdateCta({ link }: { link: ContentLink }) {
  if (link.destination === "legacy") return null;

  const isExternal = link.destination === "external";

  return (
    <Link
      className={cn(buttonVariants({ size: "md", variant: "link" }), "mt-6")}
      href={link.href as Route}
      rel={isExternal ? "noopener noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      {link.label}
      <Icon icon={isExternal ? ArrowUpRightIcon : ArrowRightIcon} />
    </Link>
  );
}

function UpdateRow({ item, showKind }: { item: Update; showKind: boolean }) {
  return (
    <li className="grid gap-x-8 gap-y-6 border-t border-border py-10 md:grid-cols-[10rem_minmax(0,1fr)] lg:grid-cols-[12rem_minmax(0,1fr)] lg:py-14">
      <div>
        <time
          className="block font-display text-xl text-ink"
          dateTime={item.publishedAt}
        >
          {dayMonthFormat.format(new Date(item.publishedAt))}
        </time>

        {item.venue === null ? null : (
          <p className="mt-3 flex items-start gap-2 font-body text-sm text-ink-muted">
            <Icon className="mt-1 size-4" icon={LocationIcon} />
            <span>
              <span className="sr-only">Venue </span>
              {item.venue}
            </span>
          </p>
        )}
      </div>

      <div className="grid gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,1fr)_14rem] xl:grid-cols-[minmax(0,1fr)_18rem]">
        <div>
          {showKind ? <Eyebrow as="p">{KIND_LABEL[item.kind]}</Eyebrow> : null}

          <H4 as="h3" className={showKind ? "mt-4" : undefined}>
            {item.title}
          </H4>

          <P className="mt-4 max-w-2xl">{item.excerpt}</P>

          {item.link === null ? null : <UpdateCta link={item.link} />}
        </div>

        {item.image === null ? null : (
          <Image
            alt={item.image.alt}
            className="h-auto w-full rounded-xl object-cover"
            height={item.image.height}
            loading="lazy"
            sizes="(min-width: 1280px) 18rem, (min-width: 1024px) 14rem, (min-width: 768px) 60vw, 92vw"
            src={item.image.src}
            width={item.image.width}
          />
        )}
      </div>
    </li>
  );
}

export function UpdateIndex({
  emptyState,
  items,
}: {
  emptyState: string;
  items: readonly Update[];
}) {
  if (items.length === 0) {
    return <P className="max-w-xl">{emptyState}</P>;
  }

  const showKind = new Set(items.map((item) => item.kind)).size > 1;
  const years = [...new Set(items.map((item) => yearOf(item.publishedAt)))];

  return (
    <div className="grid gap-y-16 lg:gap-y-24">
      {years.map((year) => (
        <section aria-labelledby={`updates-${year}`} key={year}>
          <H3 as="h2" id={`updates-${year}`}>
            {year}
          </H3>

          <ul className="mt-8 lg:mt-10">
            {items
              .filter((item) => yearOf(item.publishedAt) === year)
              .map((item) => (
                <UpdateRow item={item} key={item.id} showKind={showKind} />
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
