import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, P } from "@/components/ui/typography";
import type { ContentImage } from "@/lib/content";
import { paragraphsOf, type RichText, type SectionCopy } from "@/lib/content";
import { ImageIcon } from "@/lib/icons";

export function AboutMascot({
  image = null,
  section,
  story,
}: {
  image?: ContentImage | null;
  section: SectionCopy;
  story: RichText;
}) {
  const paragraphs = paragraphsOf(story);

  if (paragraphs.length === 0) return null;

  return (
    <section
      className="gutter-x pb-10 pt-[var(--spacing-section-py)] lg:pb-16"
      id="mascot"
    >
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-10">
          <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1">
            <Reveal>
              <div className="flex items-center gap-5">
                <Eyebrow>{section.heading}</Eyebrow>
                <span className="h-px flex-1 bg-border" />
              </div>
            </Reveal>
            <SplitText as="h2" className="mt-4">
              {section.eyebrow ?? "The Mascot"}
            </SplitText>

            <Reveal className="mt-8 flex flex-col gap-5" stagger={0.1}>
              {paragraphs.map((paragraph) => (
                <RevealItem key={paragraph}>
                  <P>{paragraph}</P>
                </RevealItem>
              ))}
            </Reveal>
          </div>

          <Reveal
            className="mt-12 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:mt-0"
            y={48}
          >
            <figure className="mx-auto w-full max-w-md">
              <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-border bg-surface-raised">
                {image === null ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
                    <Icon className="size-8 text-ink-muted" icon={ImageIcon} />
                  </div>
                ) : (
                  <Image
                    alt={image.alt}
                    className="h-full w-full object-contain"
                    height={image.height}
                    loading="lazy"
                    sizes="(max-width: 448px) 100vw, 448px"
                    src={image.src}
                    width={image.width}
                  />
                )}
              </div>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
