import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, P, Standfirst } from "@/components/ui/typography";
import type { Stat } from "@/lib/content";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";
import { StatsCounter } from "./stats-counter";

function StatCard({ lead = false, stat }: { lead?: boolean; stat: Stat }) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 rounded-xl bg-surface-raised px-4 py-6 xl:py-7",
        lead ? "col-span-2 sm:col-span-3 xl:col-span-2" : null,
      )}
    >
      <dt className="font-body text-sm text-ink">
        {stat.label}
        {stat.detail === null ? null : (
          <span className="mt-1 block text-ink-muted">{stat.detail}</span>
        )}
      </dt>
      <dd
        className={cn(
          "font-display text-accent",
          lead ? "text-6xl" : "text-4xl",
        )}
      >
        <StatsCounter suffix={stat.suffix} value={stat.value} />
      </dd>
    </div>
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
    <section className="gutter-x section-y" id="stats">
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <div className="lg:col-span-7">
            {section.eyebrow === null ? null : (
              <Reveal className="flex items-center gap-5">
                <Eyebrow>{section.eyebrow}</Eyebrow>
                <span className="h-px flex-1 bg-border" />
              </Reveal>
            )}

            <SplitText as="h2" className="mt-6 font-display text-5xl lg:mt-8">
              {section.heading}
            </SplitText>
          </div>

          {section.standfirst === null ? null : (
            <Reveal
              className="mt-8 lg:col-span-4 lg:col-start-9 lg:mt-0"
              delay={0.25}
            >
              <Standfirst>{section.standfirst}</Standfirst>
            </Reveal>
          )}
        </div>

        {figures.length === 0 ? (
          section.emptyState === null ? null : (
            <P className="mt-12 lg:w-5/12">{section.emptyState}</P>
          )
        ) : (
          <Reveal className="mt-12 lg:mt-16" delay={0.3} y={32}>
            <div className="rounded-xl bg-accent p-4 sm:p-5 xl:p-6">
              <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-7">
                {rollUps.map((stat) => (
                  <StatCard key={stat.id} lead stat={stat} />
                ))}
                {ledger.map((stat) => (
                  <StatCard key={stat.id} stat={stat} />
                ))}
              </dl>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
