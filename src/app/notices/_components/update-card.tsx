import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H6 } from "@/components/ui/typography";
import type { ContentLink, Update } from "@/lib/content";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/lib/icons";
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
      className={cn(buttonVariants({ size: "md", variant: "link" }), "mt-5")}
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
    <div className="flex h-full flex-col justify-end p-5 sm:p-6">
      <span
        aria-hidden="true"
        className="block border-t border-border-strong pt-4 font-display text-7xl leading-none text-ink-muted text-outline"
      >
        {item.publishedAt.slice(0, 4)}
      </span>
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
  const upcoming = isUpcoming(item, today);
  const stamp = upcoming
    ? (item.happensAt ?? item.publishedAt)
    : item.publishedAt;

  return (
    <li className="group flex flex-col" data-update-entry="">
      <div className="relative aspect-[4/3] overflow-hidden rounded-media bg-muted">
        {item.image === null ? (
          <UpdatePlate item={item} />
        ) : (
          <Image
            alt={item.image.alt}
            className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
            fill
            loading="lazy"
            sizes={sizes}
            src={item.image.src}
          />
        )}
      </div>

      <div className="mt-6 border-t border-border pt-5">
        <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <Eyebrow as="span">
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

        <H6 as="h2" className="mt-3">
          {item.title}
        </H6>

        <time
          className="mt-3 block font-body text-sm text-ink-muted"
          dateTime={stamp}
        >
          <span className="sr-only">
            {upcoming
              ? noticesCopy.upcomingLabel
              : noticesCopy.publishedLabel}{" "}
          </span>
          {fullDate.format(new Date(stamp))}
        </time>

        {item.link === null ? null : <UpdateCta link={item.link} />}
      </div>
    </li>
  );
}
