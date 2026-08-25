import type { Route } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { UpdateBoard } from "@/components/shared/update-board";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { P } from "@/components/ui/typography";
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
        <SectionHeader
          action={
            section.cta === null ? null : <UpdateCta link={section.cta} />
          }
          description={section.standfirst}
          eyebrow={section.heading}
          layout="action"
          title={section.eyebrow ?? "Notices"}
        />

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
