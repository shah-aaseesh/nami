import { Marquee } from "@/components/motion/marquee";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { content } from "@/lib/content";
import { AsteriskIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

function titleStep(title: string): string {
  if (title.length <= 24) return "text-4xl";
  if (title.length <= 36) return "text-3xl";
  return "text-xl";
}

function bodyStep(): string {
  return "text-2xl";
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
          <span className={cn("font-display tracking-normal", step(item))}>
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
  const programmes = await content.getProgrammes();
  const titles = [
    ...new Set(programmes.map((programme) => programme.shortTitle)),
  ];
  const bodies = [
    ...new Set(programmes.map((programme) => programme.awardingBody)),
  ];

  return (
    <section className="gutter-x section-y-compact" id="programmes">
      {programmes.length === 0 ? null : (
        <Reveal className="bleed-x" stagger={0.12}>
          <RevealItem className="field-ink py-4">
            <Marquee label="Programmes" speed={70}>
              <MarqueeRow
                glyphClassName="size-5"
                items={titles}
                step={titleStep}
              />
            </Marquee>
          </RevealItem>

          <RevealItem className="field-brand py-5">
            <Marquee copies={3} label="Awarding bodies" reverse speed={50}>
              <MarqueeRow
                glyphClassName="size-4"
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
