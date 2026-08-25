import type { Route } from "next";
import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { UpdateBoard } from "@/components/shared/update-board";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, P, Standfirst } from "@/components/ui/typography";
import type { ContentLink } from "@/lib/content";
import { content } from "@/lib/content";
import { ArrowRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const HOME_TEASER_COUNT = 3;

function UpdateCta({
  className,
  link,
}: {
  className?: string;
  link: ContentLink;
}) {
  return (
    <Link
      className={cn(
        buttonVariants({ size: "lg", variant: "default" }),
        className,
      )}
      href={link.href as Route}
    >
      {link.label}
      <Icon icon={ArrowRightIcon} />
    </Link>
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

  const indexHref =
    section.cta === null || section.cta.destination === "legacy"
      ? null
      : (section.cta.href as Route);

  return (
    <section className="gutter-x section-y" id="updates">
      <div className="mx-auto max-w-page">
        <Reveal stagger={0.08}>
          <RevealItem className="flex items-center gap-5">
            <Eyebrow>{section.heading}</Eyebrow>
            <span className="h-px flex-1 bg-border" />
          </RevealItem>

          <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-x-12">
            <div className="max-w-2xl">
              <SplitText as="h2">{section.eyebrow ?? "Notices"}</SplitText>

              {section.standfirst === null ? null : (
                <RevealItem className="mt-4">
                  <Standfirst>{section.standfirst}</Standfirst>
                </RevealItem>
              )}
            </div>

            {section.cta === null ? null : (
              <RevealItem className="shrink-0">
                <UpdateCta link={section.cta} />
              </RevealItem>
            )}
          </div>
        </Reveal>

        {updates.length === 0 && section.emptyState !== null ? (
          <P className="mt-12 max-w-xl">{section.emptyState}</P>
        ) : null}

        {updates.length === 0 ? null : (
          <Reveal className="mt-10 lg:mt-14" stagger={0.08}>
            <UpdateBoard indexHref={indexHref} items={updates} />
          </Reveal>
        )}
      </div>
    </section>
  );
}
