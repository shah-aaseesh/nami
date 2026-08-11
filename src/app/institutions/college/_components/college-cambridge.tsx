import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, P, Standfirst } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

export type CollegeProposition = {
  readonly title: string;
  readonly body: string;
};

export type CollegeCambridgeCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly propositions: readonly CollegeProposition[];
};

export function CollegeCambridge({
  copy,
}: {
  readonly copy: CollegeCambridgeCopy;
}) {
  return (
    <section className="field-ink gutter-x section-y" id="cambridge">
      <div className="mx-auto max-w-page">
        <Reveal className="lg:grid lg:grid-cols-12 lg:gap-x-10" stagger={0.08}>
          <div className="lg:col-span-5">
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

        <Reveal
          className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
          stagger={0.1}
        >
          {copy.propositions.map((proposition, index) => (
            <RevealItem
              className={cn(
                "border-t border-border pt-6",
                index % 2 === 1 && "lg:mt-14",
              )}
              key={proposition.title}
            >
              <p className="font-display text-3xl text-accent">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-5 font-display text-2xl font-normal text-ink">
                {proposition.title}
              </h3>
              <P className="mt-3">{proposition.body}</P>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
