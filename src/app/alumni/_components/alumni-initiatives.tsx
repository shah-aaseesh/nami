import {
  Calendar03Icon,
  GlobalIcon,
  Mortarboard01Icon,
  SparklesIcon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H2, H5, P, Standfirst } from "@/components/ui/typography";
import type { AlumniInitiative } from "./alumni-copy";

const initiativeIcons = [
  UserGroupIcon,
  SparklesIcon,
  Mortarboard01Icon,
  Calendar03Icon,
];

export function AlumniInitiatives({
  copy,
}: {
  readonly copy: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly standfirst: string;
    readonly items: readonly AlumniInitiative[];
  };
}) {
  return (
    <section
      className="gutter-x section-y bg-neutral-100/60 border-y border-border/80"
      id="initiatives"
    >
      <div className="mx-auto max-w-page">
        <Reveal className="max-w-3xl">
          <RevealItem className="flex items-center gap-4">
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <span className="h-px flex-1 bg-border" />
          </RevealItem>

          <RevealItem className="mt-5">
            <H2>{copy.heading}</H2>
          </RevealItem>

          <RevealItem className="mt-4">
            <Standfirst>{copy.standfirst}</Standfirst>
          </RevealItem>
        </Reveal>

        <Reveal className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 sm:mt-16">
          {copy.items.map((item, idx) => {
            const IconComponent =
              initiativeIcons[idx % initiativeIcons.length] ?? GlobalIcon;
            return (
              <RevealItem
                key={item.title}
                className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-surface-raised p-7 shadow-2xs transition-all duration-300 hover:border-accent/40 hover:shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                      <Icon icon={IconComponent} className="size-5" />
                    </div>

                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-ink-muted">
                      {item.tag}
                    </span>
                  </div>

                  <H5 className="mt-6 text-base font-semibold text-ink">
                    {item.title}
                  </H5>

                  <P className="mt-3 text-sm text-ink-muted leading-relaxed">
                    {item.description}
                  </P>
                </div>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
