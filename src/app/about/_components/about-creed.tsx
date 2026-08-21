import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, H1, H4, Standfirst } from "@/components/ui/typography";
import { paragraphsOf, type RichText, type SectionCopy } from "@/lib/content";

function CreedStatement({
  body,
  className,
  label,
}: {
  body: readonly string[];
  className?: string;
  label: string;
}) {
  if (body.length === 0) return null;

  return (
    <div className={className}>
      <Eyebrow as="h3">{label}</Eyebrow>
      <div className="mt-6 flex flex-col gap-5 lg:mt-8">
        {body.map((paragraph) => (
          <H4 as="p" className="text-pretty" key={paragraph}>
            {paragraph}
          </H4>
        ))}
      </div>
    </div>
  );
}

export function AboutCreed({
  mission,
  motto,
  section,
  vision,
}: {
  mission: RichText;
  motto: string;
  section: SectionCopy;
  vision: RichText;
}) {
  const missionBody = paragraphsOf(mission);
  const visionBody = paragraphsOf(vision);
  const mottoLine = motto.trim();

  if (
    missionBody.length === 0 &&
    visionBody.length === 0 &&
    mottoLine.length === 0
  ) {
    return null;
  }

  return (
    <section className="gutter-x section-y" id="creed">
      <div className="mx-auto max-w-page">
        <div>
          {section.eyebrow === null ? null : (
            <Reveal>
              <Eyebrow>{section.eyebrow}</Eyebrow>
            </Reveal>
          )}
          <SplitText
            as="h2"
            className="mt-4 font-display text-3xl sm:text-4xl font-normal tracking-tight text-ink text-balance lg:text-5xl"
          >
            {section.heading}
          </SplitText>
          {section.standfirst === null ? null : (
            <Reveal className="mt-5">
              <Standfirst className="max-w-2xl">
                {section.standfirst}
              </Standfirst>
            </Reveal>
          )}
        </div>

        <Reveal className="mt-10 lg:mt-14" y={32}>
          <div className="overflow-hidden rounded-3xl">
            <div className="grid lg:grid-cols-2">
              <CreedStatement
                body={visionBody}
                className="field-ink p-6 sm:p-10 xl:p-14"
                label="Vision"
              />
              <CreedStatement
                body={missionBody}
                className="field-ink border-t border-border p-6 sm:p-10 lg:border-t-0 lg:border-s xl:p-14"
                label="Mission"
              />
            </div>

            {mottoLine.length === 0 ? null : (
              <div className="field-brand p-6 sm:p-10 xl:p-14">
                <Eyebrow as="h3">Motto</Eyebrow>
                <H1 as="p" className="mt-6 max-w-4xl lg:mt-8">
                  {mottoLine}
                </H1>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
