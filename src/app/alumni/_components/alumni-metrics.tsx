import {
  Award01Icon,
  GlobalIcon,
  Mortarboard01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H2, H3, H5, P, Standfirst } from "@/components/ui/typography";
import type { AlumniMetric } from "./alumni-copy";

const statIcons = [GlobalIcon, Mortarboard01Icon, Award01Icon, SparklesIcon];

export function AlumniMetrics({
  copy,
}: {
  readonly copy: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly standfirst: string;
    readonly items: readonly AlumniMetric[];
  };
}) {
  return (
    <section
      className="gutter-x section-y bg-neutral-100/60 border-y border-border/80"
      id="impact"
    >
      <div className="mx-auto max-w-page">
        <Reveal className="max-w-3xl">
          <RevealItem className="flex items-center gap-5">
            <Eyebrow>{copy.heading}</Eyebrow>
            <span className="h-px flex-1 bg-border" />
          </RevealItem>

          <RevealItem className="mt-4">
            <H2>{copy.eyebrow ?? "Impact & Scale"}</H2>
          </RevealItem>

          <RevealItem className="mt-4">
            <Standfirst>{copy.standfirst}</Standfirst>
          </RevealItem>
        </Reveal>

        <Reveal className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:mt-16">
          {copy.items.map((item, idx) => {
            const IconComponent =
              statIcons[idx % statIcons.length] ?? GlobalIcon;
            return (
              <RevealItem
                key={item.label}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-surface-raised p-7 shadow-2xs transition-all duration-300 hover:border-accent/40 hover:shadow-xs"
              >
                <div>
                  <div className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                    <Icon icon={IconComponent} className="size-5" />
                  </div>

                  <H3 className="mt-6 font-display text-3xl sm:text-4xl text-accent font-normal tracking-tight">
                    {item.stat}
                  </H3>

                  <H5 className="mt-2 text-base font-semibold text-ink">
                    {item.label}
                  </H5>
                </div>

                <P className="mt-4 text-xs text-ink-muted leading-relaxed border-t border-border/60 pt-4">
                  {item.detail}
                </P>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
