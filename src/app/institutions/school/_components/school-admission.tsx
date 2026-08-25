import { Eyebrow, H2, H6, P, Standfirst } from "@/components/ui/typography";
import { SchoolAdmissionTrack } from "./school-admission-track";

const RING_RADIUS = 23;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

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
};

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
          className="stroke-primary-400"
          cx="24"
          cy="24"
          r={RING_RADIUS}
          strokeWidth="1"
        />
        <circle
          className="stroke-primary-800"
          cx="24"
          cy="24"
          r={RING_RADIUS}
          strokeDasharray={RING_LENGTH}
          strokeDashoffset={RING_LENGTH * (1 - position / total)}
          strokeWidth="2"
        />
      </svg>
      <span aria-hidden="true" className="font-display text-sm text-ink">
        {position}
      </span>
      <span className="sr-only">{label}</span>
    </span>
  );
}

export function SchoolAdmission({
  copy,
  id,
}: {
  readonly copy: SchoolAdmissionCopy;
  readonly id?: string;
}) {
  const total = copy.steps.length;

  if (total === 0) return null;

  return (
    <section className="field-brand gutter-x section-y" id={id}>
      <SchoolAdmissionTrack
        heading={
          <div>
            <div className="flex items-center gap-5">
              <Eyebrow>{copy.heading}</Eyebrow>
              <span className="h-px flex-1 bg-border" />
            </div>

            <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-x-16">
              <H2 className="lg:max-w-2xl">{copy.eyebrow ?? "Admissions"}</H2>

              <div className="lg:max-w-md">
                <Standfirst>{copy.standfirst}</Standfirst>
              </div>
            </div>
          </div>
        }
        label={copy.eyebrow}
        total={total}
      >
        {copy.steps.map((step, index) => (
          <li
            className="flex w-4/5 shrink-0 snap-start flex-col gap-5 rounded-2xl bg-primary-100 p-6 sm:w-1/2 lg:w-1/3 lg:p-8 xl:w-1/4"
            key={step.title}
          >
            <StepRing
              label={copy.stepLabel}
              position={index + 1}
              total={total}
            />

            <div>
              <H6 as="h3" className="text-primary-800">
                {step.title}
              </H6>
              <P className="mt-3 text-sm text-neutral-700">{step.body}</P>
            </div>
          </li>
        ))}
      </SchoolAdmissionTrack>
    </section>
  );
}
