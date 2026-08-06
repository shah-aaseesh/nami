import type { Route } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { H3, P } from "@/components/ui/typography";
import { ArrowUpRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const HEADING_ID = "site-cta-band-heading";

export type SiteCtaBandProps = {
  heading: string;
  standfirst: string;
  email: string;
};

export function SiteCtaBand({ email, heading, standfirst }: SiteCtaBandProps) {
  return (
    <section aria-labelledby={HEADING_ID} className="relative gutter-x">
      <div
        aria-hidden="true"
        className="field-ink absolute inset-x-0 top-1/2 bottom-0"
      />

      <Reveal className="relative mx-auto max-w-page">
        <div className="field-brand flex flex-col items-start justify-between gap-y-8 rounded-xl px-8 py-12 sm:px-12 lg:min-h-50 lg:flex-row lg:items-center lg:gap-x-16 lg:px-20 lg:py-0">
          <div className="max-w-md">
            <H3 as="h2" id={HEADING_ID}>
              {heading}
            </H3>
            <P className="mt-3">{standfirst}</P>
          </div>

          <Link
            className={cn(buttonVariants({ size: "lg" }), "max-w-full")}
            href={`mailto:${email}` as Route}
          >
            <span className="truncate">{email}</span>
            <Icon icon={ArrowUpRightIcon} />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
