import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, P, Standfirst } from "@/components/ui/typography";

export type SchoolDayEntry = {
  readonly title: string;
  readonly body: string;
};

export type SchoolDayCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly approachLabel: string;
  readonly approach: readonly SchoolDayEntry[];
  readonly campusLabel: string;
  readonly campus: readonly SchoolDayEntry[];
};

export function SchoolDay({
  copy,
  id,
}: {
  readonly copy: SchoolDayCopy;
  readonly id?: string;
}) {
  return (
    <section className="field-ink gutter-x section-y" id={id}>
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

        <div className="mt-14 lg:mt-20 lg:grid lg:grid-cols-12 lg:gap-x-10">
          <Reveal
            className="flex flex-col gap-10 lg:col-span-5"
            stagger={0.1}
            y={28}
          >
            <RevealItem>
              <p className="font-body text-xs font-medium tracking-widest text-accent uppercase">
                {copy.approachLabel}
              </p>
            </RevealItem>

            {copy.approach.map((entry) => (
              <RevealItem
                className="border-t border-border pt-6"
                key={entry.title}
              >
                <h3 className="font-display text-2xl font-normal text-ink">
                  {entry.title}
                </h3>
                <P className="mt-3">{entry.body}</P>
              </RevealItem>
            ))}
          </Reveal>

          <Reveal
            className="mt-16 lg:col-span-6 lg:col-start-7 lg:mt-0"
            stagger={0.06}
            y={24}
          >
            <p
              className="font-body text-xs font-medium tracking-widest text-accent uppercase"
              data-reveal-item=""
            >
              {copy.campusLabel}
            </p>

            <ul className="@container mt-8 border-t border-border">
              {copy.campus.map((entry) => (
                <li
                  className="grid gap-x-8 gap-y-2 border-b border-border py-5 @lg:grid-cols-[auto_minmax(0,1fr)]"
                  data-reveal-item=""
                  key={entry.title}
                >
                  <h3 className="font-display text-xl font-normal text-ink">
                    {entry.title}
                  </h3>
                  <p className="font-body text-sm text-ink-muted">
                    {entry.body}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
