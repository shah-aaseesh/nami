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
import { ArrowRightIcon, ArrowUpRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const HOME_TEASER_COUNT = 3;

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

            <SplitText as="h2" className="mt-6 lg:mt-8">
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
            <UpdateBoard indexHref={indexHref} items={updates} />
          </Reveal>
        )}
      </div>
    </section>
  );
}
