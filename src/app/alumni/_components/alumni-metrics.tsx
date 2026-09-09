import {
  Award01Icon,
  GlobalIcon,
  Mortarboard01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { Icon } from "@/components/ui/icon";
import { H3, H5, P } from "@/components/ui/typography";
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
      className="field-brand gutter-x section-y relative overflow-hidden"
      id="impact"
    >
      {/* Decorative ambient lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-10 size-[400px] rounded-full bg-black/20 blur-3xl" />

      <div className="mx-auto max-w-page relative">
        <SectionHeader
          eyebrow={
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/20 px-3 py-0.5 text-xs font-semibold tracking-wider text-white uppercase">
              <span className="size-1.5 rounded-full bg-white animate-pulse" />
              {copy.eyebrow ?? "Impact & Scale"}
            </span>
          }
          title={<span className="text-white">{copy.heading}</span>}
          description={<span className="text-white/85">{copy.standfirst}</span>}
        />

        <Reveal className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:mt-16">
          {copy.items.map((item, idx) => {
            const IconComponent =
              statIcons[idx % statIcons.length] ?? GlobalIcon;
            return (
              <RevealItem
                key={item.label}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/15 bg-white/10 p-7 backdrop-blur-md shadow-lg shadow-black/10 transition-all duration-300 hover:bg-white/18 hover:border-white/30 hover:-translate-y-1"
              >
                <div>
                  <div className="flex size-11 items-center justify-center rounded-xl bg-white/20 text-white shadow-xs transition-colors duration-300 group-hover:bg-white group-hover:text-primary-800">
                    <Icon icon={IconComponent} className="size-5" />
                  </div>

                  <H3 className="mt-6 font-display text-3xl sm:text-4xl text-white font-normal tracking-tight">
                    {item.stat}
                  </H3>

                  <H5 className="mt-2 text-base font-semibold text-white">
                    {item.label}
                  </H5>
                </div>

                <P className="mt-4 text-xs text-white/80 leading-relaxed border-t border-white/15 pt-4">
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
