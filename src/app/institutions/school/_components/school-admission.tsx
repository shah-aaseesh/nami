import type { Route } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, P, Standfirst } from "@/components/ui/typography";
import type { ContentLink } from "@/lib/content";
import { ArrowUpRightIcon, PhoneIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type SchoolAdmissionStep = {
  readonly title: string;
  readonly body: string;
};

export type SchoolAdmissionCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly stepLabel: string;
  readonly steps: readonly SchoolAdmissionStep[];
  readonly callHeading: string;
  readonly callBody: string;
  readonly cta: ContentLink;
  readonly phoneLabel: string;
};

export function SchoolAdmission({
  copy,
  id,
  phone,
}: {
  readonly copy: SchoolAdmissionCopy;
  readonly id?: string;
  readonly phone: string | null;
}) {
  const external = copy.cta.destination === "external";

  return (
    <section className="gutter-x section-y" id={id}>
      <div className="mx-auto max-w-page">
        <Reveal className="flex items-center gap-5">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <span className="h-px flex-1 bg-border" />
        </Reveal>

        <div className="mt-6 flex flex-col gap-6 lg:mt-8 lg:flex-row lg:items-end lg:justify-between lg:gap-x-16">
          <SplitText
            as="h2"
            className="font-display text-5xl font-normal text-balance text-ink lg:max-w-2xl"
          >
            {copy.heading}
          </SplitText>

          <Reveal className="lg:max-w-md" delay={0.2}>
            <Standfirst>{copy.standfirst}</Standfirst>
          </Reveal>
        </div>

        <Reveal className="mt-14 lg:mt-20" delay={0.25} stagger={0.07} y={26}>
          <ol className="border-t border-border">
            {copy.steps.map((step, index) => (
              <li
                className="grid gap-x-10 gap-y-3 border-b border-border py-8 sm:grid-cols-[auto_minmax(0,1fr)] lg:py-10"
                data-reveal-item=""
                key={step.title}
              >
                <p className="font-display text-4xl text-accent sm:pt-1">
                  <span className="sr-only">{copy.stepLabel} </span>
                  {String(index + 1).padStart(2, "0")}
                </p>

                <div>
                  <h3 className="font-display text-2xl font-normal text-balance text-ink lg:text-3xl">
                    {step.title}
                  </h3>
                  <P className="mt-3 max-w-3xl">{step.body}</P>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal
          className="mt-14 flex flex-col gap-8 border-t border-border-strong pt-10 lg:mt-20 lg:flex-row lg:items-end lg:justify-between lg:gap-x-16"
          delay={0.2}
        >
          <div className="lg:max-w-xl">
            <h3 className="font-display text-4xl font-normal text-balance text-ink">
              {copy.callHeading}
            </h3>
            <P className="mt-4">{copy.callBody}</P>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:shrink-0">
            <Link
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full justify-center gap-2 rounded-full px-6 sm:w-auto",
              )}
              href={copy.cta.href as Route}
              rel={external ? "noopener noreferrer" : undefined}
              target={external ? "_blank" : undefined}
            >
              <span>{copy.cta.label}</span>
              <Icon className="size-4" icon={ArrowUpRightIcon} />
            </Link>

            {phone === null ? null : (
              <Link
                className={cn(
                  buttonVariants({ size: "lg", variant: "quiet" }),
                  "w-full justify-center gap-2 rounded-full px-6 sm:w-auto",
                )}
                href={`tel:${phone.replace(/[^+\d]/g, "")}` as Route}
              >
                <Icon className="size-4" icon={PhoneIcon} />
                <span className="sr-only">{copy.phoneLabel}</span>
                <span>{phone}</span>
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
