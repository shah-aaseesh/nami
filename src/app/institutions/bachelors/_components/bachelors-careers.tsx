import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, P, Standfirst } from "@/components/ui/typography";
import type { CareerPartner } from "./partner-carousel";
import { PartnerCarousel } from "./partner-carousel";

export type CareerLane = {
  readonly key: string;
  readonly label: string;
  readonly items: readonly string[];
};

export type BachelorsCareersCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly lanes: readonly CareerLane[];
  readonly railEyebrow: string;
  readonly railHeading: string;
  readonly railLabel: string;
  readonly railNote: string;
};

export function BachelorsCareers({
  copy,
  partners,
}: {
  readonly copy: BachelorsCareersCopy;
  readonly partners: readonly CareerPartner[];
}) {
  return (
    <section className="field-ink gutter-x section-y" id="careers">
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{copy.eyebrow}</Eyebrow>
            </Reveal>

            <SplitText
              as="h2"
              className="mt-4 font-display text-5xl font-normal text-balance text-ink lg:text-6xl"
            >
              {copy.heading}
            </SplitText>
          </div>

          <Reveal
            className="mt-8 max-w-xl lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end"
            delay={0.15}
          >
            <Standfirst>{copy.standfirst}</Standfirst>
          </Reveal>
        </div>

        <Reveal
          className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3"
          stagger={0.1}
          y={28}
        >
          {copy.lanes.map((lane, index) => (
            <RevealItem
              className="border-t border-border-strong pt-6"
              key={lane.key}
            >
              <p className="font-display text-3xl text-accent">
                {String(index + 1).padStart(2, "0")}
              </p>

              <h3 className="mt-5 font-display text-2xl font-normal text-ink">
                {lane.label}
              </h3>

              <ul className="mt-5 flex flex-col">
                {lane.items.map((destination) => (
                  <li
                    className="border-t border-border py-3 font-body text-sm text-pretty text-ink-muted"
                    key={destination}
                  >
                    {destination}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </Reveal>

        <div className="mt-20 flex flex-col gap-6 lg:mt-28 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="lg:max-w-2xl">
            <Reveal>
              <Eyebrow>{copy.railEyebrow}</Eyebrow>
            </Reveal>

            <SplitText
              as="h3"
              className="mt-4 font-display text-4xl font-normal text-balance text-ink"
            >
              {copy.railHeading}
            </SplitText>
          </div>

          <Reveal className="lg:max-w-md" delay={0.15}>
            <P>{copy.railNote}</P>
          </Reveal>
        </div>
      </div>

      <Reveal className="mt-12 md:bleed-x lg:mt-16" delay={0.2}>
        <PartnerCarousel items={partners} label={copy.railLabel} />
      </Reveal>
    </section>
  );
}
