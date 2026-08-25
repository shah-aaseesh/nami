import {
  Award01Icon,
  BookOpen01Icon,
  Briefcase02Icon,
  GlobalIcon,
  HeartCheckIcon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { Icon } from "@/components/ui/icon";
import { H5, P } from "@/components/ui/typography";
import type { BenefitItem } from "./careers-copy";

const benefitIcons = [
  Award01Icon,
  BookOpen01Icon,
  Briefcase02Icon,
  GlobalIcon,
  HeartCheckIcon,
  SparklesIcon,
];

export function CareersBenefits({
  copy,
}: {
  readonly copy: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly standfirst: string;
    readonly items: readonly BenefitItem[];
  };
}) {
  return (
    <section
      className="gutter-x section-y bg-neutral-100/60 border-y border-border/80"
      id="benefits"
    >
      <div className="mx-auto max-w-page">
        <SectionHeader
          eyebrow={copy.heading}
          title={copy.eyebrow ?? "Why Work With Us"}
          description={copy.standfirst}
        />

        <Reveal className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 sm:mt-16">
          {copy.items.map((item, idx) => {
            const IconComponent =
              benefitIcons[idx % benefitIcons.length] ?? Award01Icon;
            return (
              <RevealItem
                key={item.title}
                className="group flex flex-col rounded-xl border border-border/80 bg-surface-raised p-7 shadow-2xs transition-all duration-300 hover:border-accent/40 hover:shadow-xs"
              >
                <div className="flex size-11 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  <Icon icon={IconComponent} className="size-5" />
                </div>
                <H5 className="mt-5 text-lg font-medium text-ink">
                  {item.title}
                </H5>
                <P className="mt-2 text-sm text-ink-muted leading-relaxed">
                  {item.desc}
                </P>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
