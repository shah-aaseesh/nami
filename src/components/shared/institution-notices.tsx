import type { Route } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { UpdateBoard } from "@/components/shared/update-board";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { P } from "@/components/ui/typography";
import type { EntityRole } from "@/lib/content";
import { content } from "@/lib/content";
import { ArrowRightIcon } from "@/lib/icons";
import { INSTITUTION_PARAM } from "@/lib/institution-filter";
import { cn } from "@/lib/utils";

export type InstitutionNoticesCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly ctaLabel: string;
  readonly emptyState: string;
};

export async function InstitutionNotices({
  copy,
  id,
  institution,
}: {
  readonly copy: InstitutionNoticesCopy;
  readonly id?: string;
  readonly institution: EntityRole;
}) {
  const allUpdates = await content.getUpdates();
  const notices = allUpdates.filter(
    (item) => item.institution === institution && item.kind === "notice",
  );

  const href = `/notices?${INSTITUTION_PARAM}=${institution}` as Route;

  return (
    <section className="gutter-x section-y" id={id}>
      <div className="mx-auto max-w-page">
        <SectionHeader
          action={
            <Link
              className={cn(buttonVariants({ size: "lg", variant: "default" }))}
              href={href}
            >
              {copy.ctaLabel}
              <Icon icon={ArrowRightIcon} />
            </Link>
          }
          description={copy.standfirst}
          layout="action"
          title={copy.eyebrow}
        />

        {notices.length === 0 ? (
          <P className="mt-8 max-w-xl text-ink-muted">{copy.emptyState}</P>
        ) : (
          <Reveal className="mt-6 sm:mt-8" stagger={0.08}>
            <UpdateBoard
              indexHref={href}
              items={notices}
              showImages={false}
              showInstitution={false}
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
