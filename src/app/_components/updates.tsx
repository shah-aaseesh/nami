import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H5, P, Standfirst } from "@/components/ui/typography";
import type { ContentLink, IsoDate, Update, UpdateKind } from "@/lib/content";
import { content } from "@/lib/content";
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
  month: "long",
  timeZone: "UTC",
  year: "numeric",
});

function formatDate(value: IsoDate) {
  return dateFormat.format(new Date(value));
}

function UpdateCta({
  className,
  link,
}: {
  className?: string;
  link: ContentLink;
}) {
  if (link.destination === "legacy") return null;

  const isExternal = link.destination === "external";

  return (
    <Link
      className={cn(buttonVariants({ size: "md", variant: "link" }), className)}
      href={link.href as Route}
      rel={isExternal ? "noopener noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      {link.label}
      <Icon icon={isExternal ? ArrowUpRightIcon : ArrowRightIcon} />
    </Link>
  );
}

function UpdateCard({ item }: { item: Update }) {
  return (
    <li
      className="border-t border-border-strong pt-6 lg:pt-8"
      data-reveal-item=""
    >
      {item.image === null ? null : (
        <Image
          alt={item.image.alt}
          className="mb-6 h-auto w-full rounded-media object-cover"
          height={item.image.height}
          loading="lazy"
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          src={item.image.src}
          width={item.image.width}
        />
      )}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-body text-sm text-ink-muted">
        <Eyebrow as="span">{KIND_LABEL[item.kind]}</Eyebrow>

        <span className="inline-flex items-center gap-2">
          <Icon className="size-4" icon={CalendarIcon} />
          <span className="sr-only">Published </span>
          <time dateTime={item.publishedAt}>
            {formatDate(item.publishedAt)}
          </time>
        </span>

        {item.venue === null ? null : (
          <span className="inline-flex items-center gap-2">
            <Icon className="size-4" icon={LocationIcon} />
            <span className="sr-only">Venue </span>
            {item.venue}
          </span>
        )}
      </div>

      <H5 as="h3" className="mt-4">
        {item.title}
      </H5>

      <P className="mt-3">{item.excerpt}</P>

      {item.link === null ? null : (
        <UpdateCta className="mt-6" link={item.link} />
      )}
    </li>
  );
}

export async function Updates() {
  const [copy, updates] = await Promise.all([
    content.getHomeCopy(),
    content.getUpdates(),
  ]);

  const section = copy.sections.updates;

  return (
    <section className="gutter-x section-y" id="updates">
      <div className="mx-auto max-w-page">
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-x-12">
          <div className="lg:max-w-2xl">
            {section.eyebrow === null ? null : (
              <Reveal className="flex items-center gap-5">
                <Eyebrow>{section.eyebrow}</Eyebrow>
                <span className="h-px flex-1 bg-border" />
              </Reveal>
            )}

            <SplitText
              as="h2"
              className="mt-6 font-editorial text-5xl font-normal tracking-normal lg:mt-8"
            >
              {section.heading}
            </SplitText>

            {section.standfirst === null ? null : (
              <Reveal className="mt-6" delay={0.2}>
                <Standfirst>{section.standfirst}</Standfirst>
              </Reveal>
            )}
          </div>

          {section.cta === null ? null : (
            <Reveal className="mt-8 lg:mt-0 lg:shrink-0" delay={0.3}>
              <UpdateCta link={section.cta} />
            </Reveal>
          )}
        </div>

        {updates.length === 0 && section.emptyState !== null ? (
          <P className="mt-12 max-w-xl">{section.emptyState}</P>
        ) : null}

        {updates.length === 0 ? null : (
          <Reveal className="mt-14 lg:mt-20" delay={0.25} stagger={0.08}>
            <ul className="grid items-start gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {updates.map((item) => (
                <UpdateCard item={item} key={item.id} />
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
