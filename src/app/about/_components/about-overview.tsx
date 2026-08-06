import Image from "next/image";
import { Parallax } from "@/components/motion/parallax";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, P } from "@/components/ui/typography";
import type { ContentImage } from "@/lib/content";
import { paragraphsOf, type RichText, type SectionCopy } from "@/lib/content";

export function AboutOverview({
  image,
  overview,
  section,
}: {
  image: ContentImage | null;
  overview: RichText;
  section: SectionCopy;
}) {
  const paragraphs = paragraphsOf(overview);

  return (
    <section
      className="gutter-x pb-10 pt-[var(--spacing-section-py)] lg:pb-16"
      id="overview"
    >
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
            {section.eyebrow === null ? null : (
              <Reveal>
                <Eyebrow>{section.eyebrow}</Eyebrow>
              </Reveal>
            )}
            <SplitText
              as="h2"
              className="mt-4 font-display text-4xl font-normal tracking-tight text-ink text-balance lg:text-5xl"
            >
              {section.heading}
            </SplitText>
          </div>

          <Reveal
            className="mt-10 lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:mt-2"
            stagger={0.08}
          >
            <Parallax className="flex flex-col gap-5" speed={1.03}>
              {paragraphs.map((paragraph) => (
                <RevealItem key={paragraph}>
                  <P>{paragraph}</P>
                </RevealItem>
              ))}
            </Parallax>
          </Reveal>
        </div>

        {image === null ? null : (
          <Reveal className="mt-12 lg:mt-16" y={32}>
            <Parallax className="overflow-hidden rounded-3xl" speed={1.05}>
              <Image
                alt={image.alt}
                className="h-[34vh] w-full object-cover lg:h-[48vh]"
                height={image.height}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 1200px"
                src={image.src}
                width={image.width}
              />
            </Parallax>
          </Reveal>
        )}
      </div>
    </section>
  );
}
