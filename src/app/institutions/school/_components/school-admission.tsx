import type { Route } from "next";
import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H3, H5, H6, P, Standfirst } from "@/components/ui/typography";
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

const RING_RADIUS = 23;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

function StepRing({
  label,
  position,
  total,
}: {
  readonly label: string;
  readonly position: number;
  readonly total: number;
}) {
  return (
    <span className="relative grid size-12 shrink-0 place-items-center">
      <svg
        aria-hidden="true"
        className="absolute inset-0 size-full -rotate-90"
        fill="none"
        viewBox="0 0 48 48"
      >
        <circle
          className="stroke-border"
          cx="24"
          cy="24"
          r={RING_RADIUS}
          strokeWidth="1"
        />
        <circle
          className="stroke-accent"
          cx="24"
          cy="24"
          r={RING_RADIUS}
          strokeDasharray={RING_LENGTH}
          strokeDashoffset={RING_LENGTH * (1 - position / total)}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>

      <span className="relative font-display text-lg text-accent">
        <span className="sr-only">{label} </span>
        {position}
      </span>
    </span>
  );
}

function StepArrow({ className }: { readonly className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("absolute size-3 stroke-accent", className)}
      fill="none"
      viewBox="0 0 12 12"
    >
      <path
        d="m4 2 4.5 4-4.5 4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function FlowStep({
  index,
  label,
  step,
  total,
}: {
  readonly index: number;
  readonly label: string;
  readonly step: SchoolAdmissionStep;
  readonly total: number;
}) {
  const endsRowAtSm = index % 2 === 1;
  const endsRowAtLg = index % 3 === 2;

  return (
    <li
      className="relative flex items-start gap-x-4 sm:flex-col sm:gap-y-4"
      data-reveal-item=""
    >
      <StepRing label={label} position={index + 1} total={total} />

      <div>
        <H6 as="h3" className="text-ink">
          {step.title}
        </H6>
        <P className="mt-2">{step.body}</P>
      </div>

      <span
        aria-hidden="true"
        className="absolute top-14 -bottom-6 left-6 w-px bg-border sm:hidden"
      >
        <StepArrow className="-bottom-1 left-1/2 -translate-x-1/2 rotate-90" />
      </span>

      <span
        aria-hidden="true"
        className={cn(
          "absolute top-6 left-14 -right-6 hidden h-px bg-border lg:-right-8",
          endsRowAtSm ? "sm:hidden" : "sm:block",
          endsRowAtLg ? "lg:hidden" : "lg:block",
        )}
      >
        <StepArrow className="-right-1 top-1/2 -translate-y-1/2" />
      </span>
    </li>
  );
}

function ArrivalStep({
  label,
  step,
  total,
}: {
  readonly label: string;
  readonly step: SchoolAdmissionStep;
  readonly total: number;
}) {
  return (
    <li
      className="flex items-start gap-x-4 rounded-xl border border-border bg-surface-raised p-6 sm:col-span-2 sm:gap-x-6 sm:p-8 lg:col-span-3 lg:items-center lg:gap-x-8"
      data-reveal-item=""
    >
      <StepRing label={label} position={total} total={total} />

      <div className="lg:flex lg:flex-1 lg:items-center lg:gap-x-10">
        <H5 as="h3" className="text-ink lg:basis-1/3">
          {step.title}
        </H5>
        <P className="mt-2 lg:mt-0 lg:flex-1">{step.body}</P>
      </div>
    </li>
  );
}

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
  const total = copy.steps.length;
  const flow = copy.steps.slice(0, -1);
  const arrival = copy.steps.at(-1) ?? null;

  return (
    <section className="gutter-x section-y" id={id}>
      <div className="mx-auto max-w-page">
        <Reveal stagger={0.08}>
          <RevealItem className="flex items-center gap-5">
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <span className="h-px flex-1 bg-border" />
          </RevealItem>

          <div className="mt-6 flex flex-col gap-6 lg:mt-8 lg:flex-row lg:items-end lg:justify-between lg:gap-x-16">
            <SplitText
              as="h2"
              className="font-display text-5xl font-normal text-balance text-ink lg:max-w-2xl"
            >
              {copy.heading}
            </SplitText>

            <RevealItem className="lg:max-w-md">
              <Standfirst>{copy.standfirst}</Standfirst>
            </RevealItem>
          </div>
        </Reveal>

        <Reveal className="mt-14 lg:mt-20" stagger={0.07} y={26}>
          <ol className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-12">
            {flow.map((step, index) => (
              <FlowStep
                index={index}
                key={step.title}
                label={copy.stepLabel}
                step={step}
                total={total}
              />
            ))}

            {arrival === null ? null : (
              <ArrivalStep
                label={copy.stepLabel}
                step={arrival}
                total={total}
              />
            )}
          </ol>
        </Reveal>

        <Reveal className="mt-14 flex flex-col gap-8 border-t border-border-strong pt-10 lg:mt-20 lg:flex-row lg:items-end lg:justify-between lg:gap-x-16">
          <div className="lg:max-w-xl">
            <H3 className="text-ink">{copy.callHeading}</H3>
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
