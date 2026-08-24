import type { ReactNode } from "react";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, H2, P, Standfirst } from "@/components/ui/typography";
import { paragraphsOf, type RichText, type SectionCopy } from "@/lib/content";

function CreedStatement({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <RevealItem className="border-t border-border-strong pt-8 lg:grid lg:grid-cols-12 lg:gap-x-10 lg:pt-12">
      <Eyebrow as="h3" className="lg:col-span-3 lg:col-start-1">
        {label}
      </Eyebrow>
      <div className="mt-5 flex flex-col gap-5 lg:col-span-8 lg:col-start-5 lg:mt-0">
        {children}
      </div>
    </RevealItem>
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
    <section className="field-brand gutter-x section-y" id="creed">
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
        {section.standfirst === null ? null : (
          <Reveal className="mt-5">
            <Standfirst className="max-w-2xl text-ink">
              {section.standfirst}
            </Standfirst>
          </Reveal>
        )}

        <Reveal
          className="mt-12 flex flex-col gap-8 lg:mt-16 lg:gap-12"
          stagger={0.12}
        >
          {mottoLine.length === 0 ? null : (
            <CreedStatement label="Motto">
              <H2 as="p" className="text-ink">
                {mottoLine}
              </H2>
            </CreedStatement>
          )}
          {visionBody.length === 0 ? null : (
            <CreedStatement label="Vision">
              {visionBody.map((paragraph) => (
                <P key={paragraph}>{paragraph}</P>
              ))}
            </CreedStatement>
          )}
          {missionBody.length === 0 ? null : (
            <CreedStatement label="Mission">
              {missionBody.map((paragraph) => (
                <P key={paragraph}>{paragraph}</P>
              ))}
            </CreedStatement>
          )}
        </Reveal>
      </div>
    </section>
  );
}
