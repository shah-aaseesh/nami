import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, P } from "@/components/ui/typography";
import { paragraphsOf, type RichText, type SectionCopy } from "@/lib/content";

function CreedCard({
  label,
  paragraphs,
}: {
  label: string;
  paragraphs: readonly string[];
}) {
  if (paragraphs.length === 0) return null;

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl sm:rounded-3xl border border-border/80 bg-surface-raised p-6 sm:p-8 lg:p-10 shadow-xs transition-shadow duration-300 hover:shadow-md">
      <div>
        <div className="flex items-center gap-3">
          <span className="size-2.5 rounded-full bg-accent" />
          <Eyebrow as="h3" className="text-accent text-sm font-semibold tracking-wider uppercase">
            {label}
          </Eyebrow>
        </div>
        <div className="mt-5 sm:mt-6 flex flex-col gap-4">
          {paragraphs.map((paragraph) => (
            <P
              className="text-base sm:text-lg lg:text-xl leading-relaxed text-ink/90 font-normal text-justify [text-align-last:left] [hyphens:auto]"
              key={paragraph}
            >
              {paragraph}
            </P>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AboutCreed({
  mission,
  vision,
  section,
}: {
  mission: RichText;
  vision: RichText;
  section: SectionCopy;
}) {
  const missionParagraphs = paragraphsOf(mission);
  const visionParagraphs = paragraphsOf(vision);

  if (missionParagraphs.length === 0 && visionParagraphs.length === 0) {
    return null;
  }

  return (
    <section className="gutter-x py-12 sm:py-16 lg:py-20" id="creed">
      <div className="mx-auto max-w-page">
        {/* Section Heading */}
        <Reveal>
          <div className="flex items-center gap-5">
            <Eyebrow>{section.heading}</Eyebrow>
            <span className="h-px flex-1 bg-border" />
          </div>
        </Reveal>

        <div className="mt-4 sm:mt-5">
          <Reveal>
            <SplitText
              as="h2"
              className="font-display text-3xl sm:text-4xl text-accent font-normal"
            >
              {section.eyebrow ?? "Mission & Vision"}
            </SplitText>
          </Reveal>
        </div>

        {/* 2-Column Side-by-Side Cards: Left Mission & Right Vision */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          <Reveal className="h-full" y={16}>
            <CreedCard label="Mission" paragraphs={missionParagraphs} />
          </Reveal>

          <Reveal className="h-full" y={24}>
            <CreedCard label="Vision" paragraphs={visionParagraphs} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
