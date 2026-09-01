import type { Route } from "next";
import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { buttonVariants } from "@/components/ui/button";
import { Eyebrow, P } from "@/components/ui/typography";
import { paragraphsOf, type RichText, type SectionCopy } from "@/lib/content";
import { cn } from "@/lib/utils";

export async function About({
  overview,
  section,
}: {
  overview: RichText;
  section: SectionCopy;
}) {
  const paragraphs = paragraphsOf(overview).slice(0, 2);

  return (
    <section className="gutter-x section-y" id="about">
      <div className="mx-auto max-w-page">
        {/* Full-width Eyebrow Bar at top for clean horizontal alignment */}
        <Reveal>
          <div className="flex items-center gap-5">
            <Eyebrow>{section.heading}</Eyebrow>
            <span className="h-px flex-1 bg-border" />
          </div>
        </Reveal>

        {/* 2-Column Content Grid: Left Title+Video & Right Narrative+Button */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16 items-start">
          {/* Left Column: Heading + Video directly below */}
          <div className="lg:col-span-5 flex flex-col">
            <Reveal>
              <SplitText
                as="h2"
                className="font-display text-3xl sm:text-4xl text-ink font-normal"
              >
                {section.eyebrow ?? "About NAMI"}
              </SplitText>
            </Reveal>

            {/* Video embedded right below NAMI since 2012 */}
            <Reveal className="mt-6 sm:mt-8" y={16}>
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-neutral-950 shadow-md">
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="size-full border-0"
                  referrerPolicy="strict-origin-when-cross-origin"
                  src="https://www.youtube-nocookie.com/embed/-4GRT2mxQxY?si=WFIYKNDhk7_9KY64"
                  title="YouTube video player"
                />
              </div>
            </Reveal>
          </div>

          {/* Right Column: Paragraphs starting at exact same top baseline */}
          <div className="lg:col-span-7 flex flex-col">
            <Reveal className="flex flex-col gap-4 sm:gap-5" stagger={0.08}>
              {paragraphs.map((paragraph) => (
                <RevealItem key={paragraph}>
                  <P className="text-base sm:text-lg leading-relaxed text-ink/90 font-normal">
                    {paragraph}
                  </P>
                </RevealItem>
              ))}
            </Reveal>

            <Reveal className="mt-6 sm:mt-8" y={10}>
              <Link
                className={cn(
                  buttonVariants({ size: "lg", variant: "default" }),
                )}
                href={"/about" as Route}
              >
                Read the full story
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
