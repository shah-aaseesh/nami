import { Marquee } from "@/components/motion/marquee";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, P } from "@/components/ui/typography";
import { content } from "@/lib/content";
import { AsteriskIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

function titleStep(title: string): string {
  if (title.length <= 24) return "text-4xl";
  if (title.length <= 36) return "text-3xl";
  return "text-2xl";
}

function bodyStep(): string {
  return "text-3xl";
}

function MarqueeRow({
  glyphClassName,
  items,
  step,
}: {
  glyphClassName: string;
  items: readonly string[];
  step: (item: string) => string;
}) {
  return (
    <ul className="flex items-center whitespace-nowrap">
      {items.map((item) => (
        <li className="flex items-center gap-8 pe-8" key={item}>
          <span className={cn("font-editorial tracking-normal", step(item))}>
            {item}
          </span>
          <Icon
            className={cn("text-accent", glyphClassName)}
            icon={AsteriskIcon}
          />
        </li>
      ))}
    </ul>
  );
}

export async function ProgrammeMarquee() {
  const [copy, programmes] = await Promise.all([
    content.getHomeCopy(),
    content.getProgrammes(),
  ]);

  const section = copy.sections.programmes;
  const titles = [
    ...new Set(programmes.map((programme) => programme.shortTitle)),
  ];
  const bodies = [
    ...new Set(programmes.map((programme) => programme.awardingBody)),
  ];

  return (
    <section className="gutter-x section-y" id="programmes">
      <div className="mx-auto max-w-page">
        {section.eyebrow === null ? null : (
          <Reveal className="flex items-center gap-5 lg:w-7/12">
            <Eyebrow>{section.eyebrow}</Eyebrow>
            <span className="h-px flex-1 bg-border" />
          </Reveal>
        )}

        <SplitText
          as="h2"
          className="mt-8 font-display text-5xl lg:mt-12 lg:w-8/12"
        >
          {section.heading}
        </SplitText>

        {programmes.length === 0 && section.emptyState !== null ? (
          <P className="mt-16 lg:w-5/12">{section.emptyState}</P>
        ) : null}
      </div>

      {programmes.length === 0 ? null : (
        <Reveal className="bleed-x mt-16 lg:mt-24" stagger={0.12}>
          <RevealItem className="field-ink py-4">
            <Marquee label="Programmes" speed={70}>
              <MarqueeRow
                glyphClassName="size-6"
                items={titles}
                step={titleStep}
              />
            </Marquee>
          </RevealItem>

          <RevealItem className="field-brand py-5">
            <Marquee copies={3} label="Awarding bodies" reverse speed={50}>
              <MarqueeRow
                glyphClassName="size-5"
                items={bodies}
                step={bodyStep}
              />
            </Marquee>
          </RevealItem>
        </Reveal>
      )}
    </section>
  );
}
