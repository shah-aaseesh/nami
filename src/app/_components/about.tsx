import type { Route } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/shared/section-header";
import { buttonVariants } from "@/components/ui/button";
import { P } from "@/components/ui/typography";
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
        <SectionHeader
          description={
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                {paragraphs.map((paragraph) => (
                  <P key={paragraph}>{paragraph}</P>
                ))}
              </div>
              <div>
                <Link
                  className={cn(
                    buttonVariants({ size: "lg", variant: "default" }),
                  )}
                  href={"/about" as Route}
                >
                  Read the full story
                </Link>
              </div>
            </div>
          }
          eyebrow={section.heading}
          layout="split"
          title={section.eyebrow ?? "About NAMI"}
        />
      </div>
    </section>
  );
}
