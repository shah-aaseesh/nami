import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, H4, P, Standfirst } from "@/components/ui/typography";

export type CollegeMilestone = {
  readonly year: number;
  readonly title: string;
  readonly body: string;
};

export type CollegeMilestonesCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly milestones: readonly CollegeMilestone[];
};

export function CollegeMilestones({
  copy,
}: {
  readonly copy: CollegeMilestonesCopy;
}) {
  if (copy.milestones.length === 0) return null;

  return (
    <section className="field-teal gutter-x section-y" id="milestones">
      <div className="mx-auto max-w-page">
        <Reveal className="lg:grid lg:grid-cols-12 lg:gap-x-10" stagger={0.08}>
          <div className="lg:col-span-6">
            <RevealItem>
              <Eyebrow>{copy.eyebrow}</Eyebrow>
            </RevealItem>
            <SplitText
              as="h2"
              className="mt-4 font-display text-5xl font-normal text-balance text-ink"
            >
              {copy.heading}
            </SplitText>
          </div>

          <RevealItem className="mt-8 max-w-xl lg:col-span-5 lg:col-start-8 lg:mt-0 lg:self-end">
            <Standfirst>{copy.standfirst}</Standfirst>
          </RevealItem>
        </Reveal>

        <Reveal className="mt-14 lg:mt-20" stagger={0.12} y={24}>
          <ol className="border-t border-border">
            {copy.milestones.map((milestone) => (
              <li
                className="border-b border-border py-8 lg:grid lg:grid-cols-12 lg:gap-x-10 lg:py-12"
                data-reveal-item=""
                key={milestone.year}
              >
                <time
                  className="block font-display text-6xl text-accent lg:col-span-3"
                  dateTime={String(milestone.year)}
                >
                  {milestone.year}
                </time>

                <div className="mt-5 lg:col-span-7 lg:col-start-5 lg:mt-0">
                  <H4>{milestone.title}</H4>
                  <P className="mt-3">{milestone.body}</P>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
