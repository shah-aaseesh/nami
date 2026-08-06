import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, H3, P, Standfirst } from "@/components/ui/typography";
import type { Stat } from "@/lib/content";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";
import { StatsCounter } from "./stats-counter";

function StatLabel({ className, stat }: { className?: string; stat: Stat }) {
  return (
    <dt className={cn("font-body text-sm text-ink-muted", className)}>
      {stat.label}
      {stat.detail === null ? null : (
        <span className="mt-1 block">{stat.detail}</span>
      )}
    </dt>
  );
}

function HeadlineFigure({ stat }: { stat: Stat }) {
  return (
    <RevealItem className="flex flex-col-reverse gap-6 lg:flex-row-reverse lg:items-end lg:gap-12">
      <StatLabel className="lg:flex-1 lg:border-b lg:pb-4" stat={stat} />
      <dd className="font-display text-10xl font-semibold">
        <StatsCounter suffix={stat.suffix} value={stat.value} />
      </dd>
    </RevealItem>
  );
}

function LedgerFigure({ stat }: { stat: Stat }) {
  return (
    <RevealItem className="flex flex-col-reverse gap-2 border-t pt-4 xl:col-span-2">
      <StatLabel stat={stat} />
      <H3 as="dd">
        <StatsCounter suffix={stat.suffix} value={stat.value} />
      </H3>
    </RevealItem>
  );
}

export async function Stats() {
  const [copy, stats] = await Promise.all([
    content.getHomeCopy(),
    content.getStats(),
  ]);

  const section = copy.sections.stats;
  const figures = stats.filter((stat) => stat.placement === "stats");
  const rollUps = figures.filter((stat) => stat.group === "alumni");
  const ledger = figures.filter((stat) => stat.group !== "alumni");

  return (
    <section className="overflow-hidden gutter-x section-y" id="stats">
      <div className="mx-auto max-w-page">
        {section.eyebrow === null ? null : (
          <Reveal className="flex items-center gap-5 lg:w-7/12">
            <Eyebrow>{section.eyebrow}</Eyebrow>
            <span className="h-px flex-1 bg-border" />
          </Reveal>
        )}

        <SplitText
          as="h2"
          className="mt-8 font-display text-5xl font-semibold lg:mt-12 lg:w-8/12"
        >
          {section.heading}
        </SplitText>

        {section.standfirst === null ? null : (
          <Reveal className="mt-12 lg:mt-14 lg:w-5/12" delay={0.25}>
            <Standfirst>{section.standfirst}</Standfirst>
          </Reveal>
        )}

        {figures.length === 0 ? (
          section.emptyState === null ? null : (
            <P className="mt-16 lg:w-5/12">{section.emptyState}</P>
          )
        ) : (
          <Reveal
            className="mt-16 flex flex-col gap-16 lg:mt-24 lg:gap-24"
            delay={0.4}
            stagger={0.08}
          >
            {rollUps.length === 0 ? null : (
              <dl className="flex flex-col gap-12">
                {rollUps.map((stat) => (
                  <HeadlineFigure key={stat.id} stat={stat} />
                ))}
              </dl>
            )}

            {ledger.length === 0 ? null : (
              <dl className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 xl:grid-cols-12">
                {ledger.map((stat) => (
                  <LedgerFigure key={stat.id} stat={stat} />
                ))}
              </dl>
            )}
          </Reveal>
        )}
      </div>
    </section>
  );
}
