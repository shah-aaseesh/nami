import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { H4, P } from "@/components/ui/typography";

export type CollegeMilestone = {
  readonly year: number;
  readonly title: string;
  readonly body: string;
  readonly logo?: string;
};

export type CollegeMilestonesCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly milestones: readonly CollegeMilestone[];
};

export function CollegeMilestones({
  copy,
}: {
  readonly copy: CollegeMilestonesCopy;
}) {
  if (copy.milestones.length === 0) return null;

  return (
    <section
      className="bg-[#E9C355]/10 text-ink gutter-x section-y border-y border-[#E9C355]/30"
      id="milestones"
    >
      <div className="mx-auto max-w-page">
        <SectionHeader
          eyebrow={copy.heading}
          eyebrowClassName="text-[#FFAD00] font-semibold"
          title={copy.eyebrow ?? "Milestones and Accreditations"}
        />

        <div className="mx-auto max-w-6xl">
          <Reveal className="mt-8 sm:mt-10 lg:mt-12" stagger={0.1} y={16}>
            <ol className="grid gap-6 sm:grid-cols-2 lg:gap-8">
              {copy.milestones.map((milestone) => (
                <li
                  className="flex h-full flex-col rounded-2xl border border-border bg-surface-raised p-6 shadow-xs sm:p-8 hover:border-[#FFAD00]/50 hover:shadow-md transition-all duration-300"
                  data-reveal-item=""
                  key={milestone.year}
                >
                  {/* Logo at top */}
                  {milestone.logo ? (
                    <div className="relative mb-6 h-12 w-36 shrink-0 sm:h-14 sm:w-44">
                      <Image
                        alt="Cambridge Assessment International Education"
                        className="object-contain object-left"
                        fill
                        sizes="176px"
                        src={milestone.logo}
                      />
                    </div>
                  ) : null}

                  {/* Year */}
                  <time
                    className="block font-display text-3xl sm:text-4xl font-bold text-[#FFAD00] tabular-nums"
                    dateTime={String(milestone.year)}
                  >
                    {milestone.year}
                  </time>

                  {/* Title & Body */}
                  <H4
                    as="h3"
                    className="mt-3 text-ink text-xl sm:text-2xl font-semibold"
                  >
                    {milestone.title}
                  </H4>

                  <P className="mt-2.5 font-body text-sm sm:text-base text-ink-muted leading-relaxed">
                    {milestone.body}
                  </P>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
