import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, P } from "@/components/ui/typography";
import type { ContentImage } from "@/lib/content";
import { paragraphsOf, type RichText, type SectionCopy } from "@/lib/content";

export function AboutOverview({
  image = null,
  overview,
  section,
}: {
  image?: ContentImage | null;
  overview: RichText;
  section: SectionCopy;
}) {
  const paragraphs = paragraphsOf(overview);

  return (
    <section
      className="gutter-x pb-12 pt-[var(--spacing-section-py)] lg:pb-20"
      id="overview"
    >
      <div className="mx-auto max-w-page">
        <Reveal>
          <div className="flex items-center gap-5">
            <Eyebrow>{section.heading}</Eyebrow>
            <span className="h-px flex-1 bg-border" />
          </div>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-10 lg:mt-8 lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <div className="lg:col-span-7">
            <SplitText as="h2">{section.eyebrow ?? "Overview"}</SplitText>

            <Reveal className="mt-6 flex flex-col gap-5 lg:mt-8" stagger={0.08}>
              {paragraphs.map((paragraph) => (
                <RevealItem key={paragraph}>
                  <P className="text-sm sm:text-base leading-relaxed text-ink/80">
                    {paragraph}
                  </P>
                </RevealItem>
              ))}
            </Reveal>
          </div>

          {image === null ? null : (
            <Reveal className="lg:col-span-5" y={32}>
              <figure className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/4.5] w-full overflow-hidden rounded-3xl border border-border/80 bg-surface-raised shadow-sm">
                <Image
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  height={image.height}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 480px"
                  src={image.src}
                  width={image.width}
                />
              </figure>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
