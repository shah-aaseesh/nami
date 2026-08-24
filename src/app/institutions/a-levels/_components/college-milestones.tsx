import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, H4, P } from "@/components/ui/typography";

export type CollegeMilestone = {
  readonly year: number;
  readonly title: string;
  readonly body: string;
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
    <section className="gutter-x section-y" id="milestones">
      <div className="mx-auto max-w-page">
        <Reveal className="lg:max-w-lg" stagger={0.08}>
          <RevealItem>
            <Eyebrow>{copy.eyebrow}</Eyebrow>
          </RevealItem>

          <SplitText
            as="h2"
            className="mt-4 font-display text-5xl font-normal text-balance text-ink"
          >
            {copy.heading}
          </SplitText>
        </Reveal>

        <Reveal className="mt-14 lg:mt-20" stagger={0.12} y={24}>
          <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {copy.milestones.map((milestone) => (
              <li
                className="border-t border-border pt-6"
                data-reveal-item=""
                key={milestone.year}
              >
                <time
                  className="block font-display text-4xl text-accent tabular-nums"
                  dateTime={String(milestone.year)}
                >
                  {milestone.year}
                </time>

                <H4 as="h3" className="mt-4 text-ink">
                  {milestone.title}
                </H4>
                <P className="mt-3">{milestone.body}</P>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
