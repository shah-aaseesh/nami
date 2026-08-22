import type { Route } from "next";
import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, P, Standfirst } from "@/components/ui/typography";
import type { EntityRole, IsoDate } from "@/lib/content";
import { content } from "@/lib/content";
import { ArrowRightIcon, LocationIcon } from "@/lib/icons";
import { INSTITUTION_PARAM } from "@/lib/institution-filter";
import { cn } from "@/lib/utils";

export type InstitutionNoticesCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly ctaLabel: string;
  readonly emptyState: string;
};

const NOTICE_COUNT = 4;

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
  year: "numeric",
});

function formatDate(value: IsoDate) {
  return dateFormat.format(new Date(value));
}

export async function InstitutionNotices({
  copy,
  id,
  institution,
}: {
  readonly copy: InstitutionNoticesCopy;
  readonly id?: string;
  readonly institution: EntityRole;
}) {
  const updates = await content.getUpdates();

  const notices = updates
    .filter(
      (item) => item.kind === "notice" && item.institution === institution,
    )
    .slice(0, NOTICE_COUNT);

  const href =
    `/notices?${INSTITUTION_PARAM}=${institution}` as Route<`/notices?${string}`>;

  return (
    <section className="gutter-x section-y" id={id}>
      <div className="mx-auto max-w-page">
        <Reveal stagger={0.08}>
          <RevealItem className="flex items-center gap-5">
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <span className="h-px flex-1 bg-border" />
          </RevealItem>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-x-8 lg:mt-8">
            <SplitText
              as="h2"
              className="font-display text-5xl font-normal text-balance text-ink sm:max-w-2xl"
            >
              {copy.heading}
            </SplitText>

            <RevealItem className="sm:shrink-0">
              <Link
                className={cn(
                  buttonVariants({ size: "lg", variant: "default" }),
                )}
                href={href}
              >
                {copy.ctaLabel}
                <Icon icon={ArrowRightIcon} />
              </Link>
            </RevealItem>
          </div>

          <RevealItem className="mt-6 max-w-2xl">
            <Standfirst>{copy.standfirst}</Standfirst>
          </RevealItem>
        </Reveal>

        {notices.length === 0 ? (
          <Reveal className="mt-10 lg:mt-14">
            <P className="max-w-xl border-t border-border pt-8">
              {copy.emptyState}
            </P>
          </Reveal>
        ) : (
          <Reveal className="mt-10 lg:mt-14" stagger={0.08} y={28}>
            <ul className="border-t border-border">
              {notices.map((item) => (
                <li
                  className="grid gap-x-8 gap-y-2 border-b border-border py-5 sm:grid-cols-[auto_minmax(0,1fr)] lg:py-7"
                  data-reveal-item=""
                  key={item.id}
                >
                  <Eyebrow
                    as="time"
                    className="sm:pt-1"
                    dateTime={item.publishedAt}
                  >
                    {formatDate(item.publishedAt)}
                  </Eyebrow>

                  <div>
                    <h3 className="font-display text-2xl font-normal text-balance text-ink">
                      {item.title}
                    </h3>

                    {item.venue === null ? null : (
                      <p className="mt-2 inline-flex items-center gap-2 font-body text-sm text-ink-muted">
                        <Icon className="size-4" icon={LocationIcon} />
                        <span className="sr-only">Venue </span>
                        {item.venue}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
