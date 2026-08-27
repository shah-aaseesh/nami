import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, H5 } from "@/components/ui/typography";
import { paragraphsOf, type RichText, type SectionCopy } from "@/lib/content";
import { AboutCreedPin } from "./about-creed-pin";

function CreedStatement({
  label,
  paragraphs,
}: {
  label: string;
  paragraphs: readonly string[];
}) {
  if (paragraphs.length === 0) return null;

  return (
    <RevealItem className="border-t border-border pt-10 first:border-0 first:pt-0 lg:pt-14">
      <Eyebrow as="h3">{label}</Eyebrow>
      <div className="mt-5 flex flex-col gap-4 lg:mt-6">
        {paragraphs.map((paragraph) => (
          <H5 as="p" className="text-pretty lg:text-3xl" key={paragraph}>
            {paragraph}
          </H5>
        ))}
      </div>
    </RevealItem>
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
    <section className="gutter-x section-y" id="creed">
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
          <AboutCreedPin className="lg:col-span-4 lg:col-start-1 lg:row-start-1">
            <Reveal>
              <div className="flex items-center gap-5">
                <Eyebrow>{section.heading}</Eyebrow>
                <span className="h-px flex-1 bg-border" />
              </div>
            </Reveal>
            <SplitText as="h2" className="mt-4">
              {section.eyebrow ?? "Our Creed"}
            </SplitText>
          </AboutCreedPin>

          <Reveal
            className="mt-12 flex flex-col gap-10 lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:mt-0 lg:gap-14"
            stagger={0.12}
          >
            <CreedStatement label="Mission" paragraphs={missionParagraphs} />
            <CreedStatement label="Vision" paragraphs={visionParagraphs} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
