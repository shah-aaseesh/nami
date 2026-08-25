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
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-4 lg:col-start-1 lg:row-start-1">
            <RevealItem className="flex items-center gap-5">
              <Eyebrow>{section.heading}</Eyebrow>
              <span className="h-px flex-1 bg-border" />
            </RevealItem>
            <SplitText as="h2" className="mt-4">
              {section.eyebrow ?? "About NAMI"}
            </SplitText>
          </div>

          <Reveal
            className="mt-10 lg:col-span-6 lg:col-start-6 lg:row-start-1 lg:mt-2"
            stagger={0.08}
          >
            <div className="flex flex-col gap-4">
              {paragraphs.map((paragraph) => (
                <RevealItem key={paragraph}>
                  <P>{paragraph}</P>
                </RevealItem>
              ))}
            </div>

            <Reveal className="mt-8">
              <Link
                className={cn(
                  buttonVariants({ size: "lg", variant: "default" }),
                )}
                href={"/about" as Route}
              >
                Read the full story
              </Link>
            </Reveal>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
