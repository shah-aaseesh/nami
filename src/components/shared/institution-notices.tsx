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

const NOTICE_COUNT = 3;

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
          eyebrow={copy.heading}
          layout="action"
          title={copy.eyebrow}
        />

        {notices.length === 0 ? (
          <Reveal className="mt-10 lg:mt-14">
            <P className="max-w-xl border-t border-border pt-8">
              {copy.emptyState}
            </P>
          </Reveal>
        ) : (
          <Reveal className="mt-10 lg:mt-14" stagger={0.08} y={28}>
            <UpdateBoard
              indexHref={href}
              items={notices}
              showInstitution={false}
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
