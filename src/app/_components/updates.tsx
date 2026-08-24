import type { Route } from "next";
import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H5, P, Standfirst } from "@/components/ui/typography";
import type { ContentImage, ContentLink, IsoDate, Update } from "@/lib/content";
import { content } from "@/lib/content";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CalendarIcon,
  LocationIcon,
} from "@/lib/icons";
import { institutionLabel } from "@/lib/institution-filter";
import { cn } from "@/lib/utils";
import { UpdatesCarousel } from "./updates-carousel";

const HOME_TEASER_COUNT = 3;

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
      className={cn(
        buttonVariants({ size: "md", variant: "outline" }),
        className,
      )}
      href={link.href as Route}
      rel={isExternal ? "noopener noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      {link.label}
      <Icon icon={isExternal ? ArrowUpRightIcon : ArrowRightIcon} />
    </Link>
  );
}

function UpdateRow({ item, ordinal }: { item: Update; ordinal: number }) {
  const alternate = ordinal % 2 === 1;

  return (
    <li
      className={cn(
        "group relative grid gap-x-4 gap-y-4 border-b border-border px-5 py-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:gap-x-8 sm:px-8 sm:py-8 lg:px-10 lg:py-9",
        alternate
          ? "bg-accent"
          : "bg-surface-raised before:absolute before:inset-0 before:origin-top before:scale-y-0 before:bg-accent before:transition-transform before:duration-300 hover:before:scale-y-100",
      )}
      data-reveal-item=""
      key={item.id}
    >
      <p
        aria-hidden="true"
        className={cn(
          "relative text-outline font-display text-7xl leading-none transition-colors duration-300",
          alternate
            ? "text-accent-ink"
            : "text-neutral-400 group-hover:text-accent-ink",
        )}
      >
        {String(ordinal + 1).padStart(2, "0")}
      </p>

      <div
        className={cn(
          "relative transition-colors duration-300 sm:border-l sm:pl-6",
          alternate
            ? "sm:border-white"
            : "sm:border-border sm:group-hover:border-white",
        )}
      >
        {item.institution === null ? null : (
          <Eyebrow
            className={cn(
              "mb-2 transition-colors duration-300",
              alternate
                ? "text-accent-ink"
                : "text-ink-muted group-hover:text-accent-ink",
            )}
          >
            {institutionLabel[item.institution]}
          </Eyebrow>
        )}

        <H5
          as="h3"
          className={cn(
            "line-clamp-2 transition-colors duration-300",
            alternate ? "text-accent-ink" : "group-hover:text-accent-ink",
          )}
        >
          {item.title}
        </H5>

        <div
          className={cn(
            "mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 font-body text-sm transition-colors duration-300",
            alternate
              ? "text-accent-ink"
              : "text-ink-muted group-hover:text-accent-ink",
          )}
        >
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
      </div>
    </li>
  );
}

export async function Updates() {
  const [copy, allUpdates] = await Promise.all([
    content.getHomeCopy(),
    content.getUpdates(),
  ]);

  const updates = allUpdates
    .filter((item) => item.kind === "news")
    .slice(0, HOME_TEASER_COUNT);

  const section = copy.sections.updates;
  const slides = updates
    .map((item) => item.image)
    .filter((image): image is ContentImage => image !== null)
    .filter(
      (image, index, all) =>
        all.findIndex((other) => other.src === image.src) === index,
    );
  const listColumns = slides.length === 0 ? "lg:col-span-12" : "lg:col-span-7";

  return (
    <section className="gutter-x section-y" id="updates">
      <div className="mx-auto max-w-page">
        <Reveal
          className="lg:flex lg:items-end lg:justify-between lg:gap-x-12"
          stagger={0.08}
        >
          <div className="lg:max-w-2xl">
            {section.eyebrow === null ? null : (
              <RevealItem className="flex items-center gap-5">
                <Eyebrow className="text-base">{section.eyebrow}</Eyebrow>
                <span className="h-px flex-1 bg-border" />
              </RevealItem>
            )}

            <SplitText
              as="h2"
              className="mt-6 font-display text-5xl font-normal tracking-normal lg:mt-8"
            >
              {section.heading}
            </SplitText>

            {section.standfirst === null ? null : (
              <RevealItem className="mt-6">
                <Standfirst>{section.standfirst}</Standfirst>
              </RevealItem>
            )}
          </div>

          {section.cta === null ? null : (
            <RevealItem className="mt-8 lg:mt-0 lg:shrink-0">
              <UpdateCta link={section.cta} />
            </RevealItem>
          )}
        </Reveal>

        {updates.length === 0 && section.emptyState !== null ? (
          <P className="mt-12 max-w-xl">{section.emptyState}</P>
        ) : null}

        {updates.length === 0 ? null : (
          <Reveal className="mt-10 lg:mt-14" stagger={0.08}>
            <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-y-0">
              <ul
                className={cn(
                  "grid auto-rows-fr border-t border-border",
                  listColumns,
                )}
              >
                {updates.map((item, index) => (
                  <UpdateRow item={item} key={item.id} ordinal={index} />
                ))}
              </ul>

              {slides.length === 0 ? null : (
                <div className="lg:col-span-5" data-reveal-item="">
                  <UpdatesCarousel
                    className="aspect-4/3 w-full lg:aspect-auto lg:h-full"
                    images={slides}
                  />
                </div>
              )}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
