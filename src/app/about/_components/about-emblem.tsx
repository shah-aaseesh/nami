import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Tilt } from "@/components/motion/tilt";
import { FivePetals, type Petal } from "@/components/shared/five-petals";
import { Eyebrow, P, Standfirst } from "@/components/ui/typography";
import { paragraphsOf, type RichText, type SectionCopy } from "@/lib/content";
import { AboutValuesDisclosure } from "./about-values-disclosure";

export function AboutEmblem({
  emblemStory,
  petals,
  section,
}: {
  emblemStory: RichText;
  petals: readonly Petal[];
  section: SectionCopy;
}) {
  const paragraphs = paragraphsOf(emblemStory);
  const lead = paragraphs[0];
  const rest = paragraphs.slice(1);

  return (
    <section
      className="field-ink gutter-x overflow-x-clip pb-10 pt-[var(--spacing-section-py)] lg:pb-16"
      id="emblem"
    >
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-10">
          <Reveal className="lg:col-span-5 lg:col-start-1" y={48}>
            <Tilt max={8} scale={1.04}>
              <div className="group relative flex items-center justify-center py-10 lg:py-0">
                <div className="absolute -inset-10 -z-10 rounded-full bg-accent/5 blur-3xl transition-opacity duration-700 group-hover:bg-accent/10" />
                <Image
                  alt="NAMI Emblem - Red Lotus"
                  className="h-auto w-full max-w-sm object-contain mix-blend-multiply drop-shadow-2xl lg:max-w-md"
                  height={408}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 450px"
                  src="/lotus.png"
                  width={612}
                />
              </div>
            </Tilt>
          </Reveal>

          <div className="mt-12 lg:col-span-6 lg:col-start-7 lg:mt-0">
            <Reveal>
              <div className="flex items-center gap-5">
                <Eyebrow>{section.heading}</Eyebrow>
                <span className="h-px flex-1 bg-border" />
              </div>
            </Reveal>
            <SplitText as="h2" className="mt-4">
              {section.eyebrow ?? "The Emblem"}
            </SplitText>

            <Reveal className="mt-8" stagger={0.12}>
              {lead === undefined ? null : (
                <RevealItem>
                  <Standfirst className="text-ink">{lead}</Standfirst>
                </RevealItem>
              )}
              {rest.length === 0 ? null : (
                <RevealItem className="mt-6 flex flex-col gap-4">
                  {rest.map((paragraph) => (
                    <P key={paragraph}>{paragraph}</P>
                  ))}
                </RevealItem>
              )}
            </Reveal>
          </div>
        </div>

        {petals.length > 0 ? (
          <div className="mt-6 lg:mt-8">
            <AboutValuesDisclosure>
              <FivePetals petals={petals} />
            </AboutValuesDisclosure>
          </div>
        ) : null}
      </div>
    </section>
  );
}
