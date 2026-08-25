import { Counter } from "@/components/motion/counter";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, Standfirst } from "@/components/ui/typography";
import type { ContentImage, SectionCopy, Stat } from "@/lib/content";
import { CampusLifeBand } from "./campus-life-band";

export function Stats({
  poster = null,
  section,
  stats,
}: {
  poster?: ContentImage | null;
  section: SectionCopy;
  stats: readonly Stat[];
}) {
  const rows = stats.filter((stat) => stat.placement === "stats");

  if (rows.length === 0) return null;

  return (
    <section className="gutter-x section-y" id="stats">
      <div className="mx-auto max-w-page">
        <div
          className={
            poster === null
              ? ""
              : "grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12 lg:items-center"
          }
        >
          {poster === null ? null : (
            <div className="lg:col-span-5">
              <CampusLifeBand poster={poster} />
            </div>
          )}

          <div
            className={
              poster === null
                ? "lg:grid lg:grid-cols-12 lg:gap-x-10"
                : "lg:col-span-7"
            }
          >
            <div className={poster === null ? "lg:col-span-5" : undefined}>
              <RevealItem className="flex items-center gap-5">
                <Eyebrow>{section.heading}</Eyebrow>
                <span className="h-px flex-1 bg-border" />
              </RevealItem>
              <SplitText as="h2" className="mt-4">
                {section.eyebrow ?? "NAMI in numbers"}
              </SplitText>

              {section.standfirst === null ? null : (
                <Reveal className="mt-4 lg:mt-6">
                  <Standfirst>{section.standfirst}</Standfirst>
                </Reveal>
              )}
            </div>

            <Reveal
              className={
                poster === null
                  ? "mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:col-span-6 lg:col-start-7 lg:mt-0"
                  : "mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:gap-x-8 sm:gap-y-8 lg:mt-10 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-8"
              }
              stagger={0.08}
            >
              {rows.map((stat) => (
                <RevealItem key={stat.id}>
                  <p className="font-display text-3xl font-normal tracking-tight text-ink sm:text-4xl lg:text-5xl">
                    <Counter suffix={stat.suffix ?? ""} value={stat.value} />
                  </p>
                  <p className="mt-1.5 font-body text-xs sm:text-sm text-ink-muted">
                    {stat.label}
                  </p>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
