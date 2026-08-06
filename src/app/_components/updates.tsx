import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H3, H4, P, Standfirst } from "@/components/ui/typography";
import type { ContentLink, IsoDate, Update, UpdateKind } from "@/lib/content";
import { content } from "@/lib/content";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/lib/icons";
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

function UpdateSchedule({ item }: { item: Update }) {
  if (item.happensAt === null && item.venue === null) return null;

  return (
    <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4 font-body text-sm">
      {item.happensAt === null ? null : (
        <div className="border-t pt-4">
          <dt className="text-ink-muted">Date</dt>
          <dd className="mt-2 text-ink">
            <time dateTime={item.happensAt}>{formatDate(item.happensAt)}</time>
          </dd>
        </div>
      )}
      {item.venue === null ? null : (
        <div className="border-t pt-4">
          <dt className="text-ink-muted">Venue</dt>
          <dd className="mt-2 text-ink">{item.venue}</dd>
        </div>
      )}
    </dl>
  );
}

function UpdateRow({ item, lead }: { item: Update; lead: boolean }) {
  return (
    <li
      className="group border-t py-10 lg:relative lg:py-14"
      data-reveal-item=""
    >
      <div className="grid gap-x-8 gap-y-6 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Eyebrow>{KIND_LABEL[item.kind]}</Eyebrow>
          <time
            className="mt-3 block font-body text-sm text-ink-muted"
            dateTime={item.publishedAt}
          >
            {formatDate(item.publishedAt)}
          </time>
        </div>

        <div className="lg:col-span-8 lg:col-start-5">
          {lead ? <H3>{item.title}</H3> : <H4 as="h3">{item.title}</H4>}

          {lead ? (
            <Standfirst className="mt-6">{item.excerpt}</Standfirst>
          ) : (
            <P className="mt-4">{item.excerpt}</P>
          )}

          <UpdateSchedule item={item} />

          {item.link === null ? null : (
            <UpdateCta className="mt-8" link={item.link} />
          )}

          {item.image === null ? null : (
            <figure className="mt-10 motion-reduce:transition-none lg:pointer-events-none lg:absolute lg:top-0 lg:start-full lg:mt-0 lg:ms-8 lg:w-3/4 lg:scale-95 lg:opacity-0 lg:transition lg:duration-500 lg:ease-out lg:group-focus-within:scale-100 lg:group-focus-within:opacity-100 lg:group-hover:scale-100 lg:group-hover:opacity-100">
              <Image
                alt={item.image.alt}
                className="h-auto w-full object-cover"
                height={item.image.height}
                loading="lazy"
                sizes="(min-width: 1024px) 40vw, 92vw"
                src={item.image.src}
                width={item.image.width}
              />
            </figure>
          )}
        </div>
      </div>
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
    <section className="overflow-hidden gutter-x section-y" id="updates">
      <div className="mx-auto max-w-page">
        {section.eyebrow === null ? null : (
          <Reveal className="flex items-center gap-5 lg:w-7/12">
            <Eyebrow>{section.eyebrow}</Eyebrow>
            <span className="h-px flex-1 bg-border" />
          </Reveal>
        )}

        <SplitText
          as="h2"
          className="mt-8 font-display text-5xl font-semibold lg:mt-12 lg:w-8/12"
        >
          {section.heading}
        </SplitText>

        {section.standfirst === null ? null : (
          <Reveal className="mt-12 lg:mt-14 lg:ms-auto lg:w-5/12" delay={0.25}>
            <Standfirst>{section.standfirst}</Standfirst>
          </Reveal>
        )}

        {updates.length === 0 ? null : (
          <Reveal className="mt-16 lg:mt-24" delay={0.25} stagger={0.08}>
            <ul className="border-b lg:w-7/12">
              {updates.map((item, index) => (
                <UpdateRow item={item} key={item.id} lead={index === 0} />
              ))}
            </ul>
          </Reveal>
        )}

        {updates.length === 0 && section.emptyState !== null ? (
          <P className="mt-16 lg:w-5/12">{section.emptyState}</P>
        ) : null}

        {section.cta === null ? null : (
          <Reveal className="mt-16 lg:mt-24 lg:w-7/12" delay={0.4}>
            <UpdateCta link={section.cta} />
          </Reveal>
        )}
      </div>
    </section>
  );
}
