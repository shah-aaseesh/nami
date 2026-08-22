import { Counter } from "@/components/motion/counter";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, Standfirst } from "@/components/ui/typography";
import type { SectionCopy, Stat } from "@/lib/content";

export function Stats({
  section,
  stats,
}: {
  section: SectionCopy;
  stats: readonly Stat[];
}) {
  const rows = stats.filter((stat) => stat.placement === "stats");

  if (rows.length === 0) return null;

  return (
    <section className="field-brand gutter-x section-y" id="numbers">
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
            {section.eyebrow === null ? null : (
              <Reveal>
                <Eyebrow>{section.eyebrow}</Eyebrow>
              </Reveal>
            )}

            <SplitText
              as="h2"
              className="mt-4 font-display text-3xl font-normal tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl"
            >
              {section.heading}
            </SplitText>

            {section.standfirst === null ? null : (
              <Reveal className="mt-6">
                <Standfirst>{section.standfirst}</Standfirst>
              </Reveal>
            )}
          </div>

          <Reveal
            className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:mt-0"
            stagger={0.1}
          >
            {rows.map((stat) => (
              <RevealItem key={stat.id}>
                <p className="font-display text-4xl font-normal tracking-tight text-ink sm:text-5xl lg:text-6xl">
                  <Counter suffix={stat.suffix ?? ""} value={stat.value} />
                </p>
                <p className="mt-2 font-body text-sm text-ink-muted">
                  {stat.label}
                </p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
