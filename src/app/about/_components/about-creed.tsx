import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Icon } from "@/components/ui/icon";
import { Display, Eyebrow, P } from "@/components/ui/typography";
import { paragraphsOf, type RichText, type SectionCopy } from "@/lib/content";
import { QuoteIcon } from "@/lib/icons";

export function AboutCreed({
  motto,
  mission,
  vision,
  section,
}: {
  motto: string;
  mission: RichText;
  vision: RichText;
  section: SectionCopy;
}) {
  const missionParagraphs = paragraphsOf(mission);
  const visionParagraphs = paragraphsOf(vision);

  if (
    motto === "" &&
    missionParagraphs.length === 0 &&
    visionParagraphs.length === 0
  ) {
    return null;
  }

  return (
    <section
      className="gutter-x pb-10 pt-[var(--spacing-section-py)] lg:pb-16"
      id="creed"
    >
      <div className="mx-auto max-w-page">
        {section.eyebrow === null ? null : (
          <Reveal>
            <Eyebrow>{section.eyebrow}</Eyebrow>
          </Reveal>
        )}
        <SplitText
          as="h2"
          className="mt-4 font-display text-5xl font-normal tracking-tight text-ink text-balance"
        >
          {section.heading}
        </SplitText>

        {motto === "" ? null : (
          <Reveal className="mt-10 lg:mt-14" y={32}>
            <div className="field-brand relative overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-16">
              <Icon
                className="size-9 text-accent lg:size-11"
                icon={QuoteIcon}
              />
              <Display as="p" className="mt-6 max-w-4xl">
                {motto}
              </Display>
            </div>
          </Reveal>
        )}

        {missionParagraphs.length === 0 &&
        visionParagraphs.length === 0 ? null : (
          <Reveal
            className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-2 lg:gap-8"
            stagger={0.12}
          >
            {missionParagraphs.length === 0 ? null : (
              <RevealItem>
                <article className="flex h-full flex-col gap-4 rounded-3xl border border-border p-8 sm:p-10">
                  <Eyebrow as="h3">Mission</Eyebrow>
                  <div className="flex flex-col gap-4">
                    {missionParagraphs.map((paragraph) => (
                      <P key={paragraph}>{paragraph}</P>
                    ))}
                  </div>
                </article>
              </RevealItem>
            )}
            {visionParagraphs.length === 0 ? null : (
              <RevealItem>
                <article className="flex h-full flex-col gap-4 rounded-3xl border border-border p-8 sm:p-10">
                  <Eyebrow as="h3">Vision</Eyebrow>
                  <div className="flex flex-col gap-4">
                    {visionParagraphs.map((paragraph) => (
                      <P key={paragraph}>{paragraph}</P>
                    ))}
                  </div>
                </article>
              </RevealItem>
            )}
          </Reveal>
        )}
      </div>
    </section>
  );
}
