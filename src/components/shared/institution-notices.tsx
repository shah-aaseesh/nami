import type { Route } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/shared/section-header";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import type { EntityRole } from "@/lib/content";
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

export function InstitutionNotices({
  copy,
  id,
  institution,
}: {
  readonly copy: InstitutionNoticesCopy;
  readonly id?: string;
  readonly institution: EntityRole;
}) {
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
      </div>
    </section>
  );
}
