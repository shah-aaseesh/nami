import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, H4, P } from "@/components/ui/typography";
import type { ContentImage } from "@/lib/content";
import { cn } from "@/lib/utils";

export type CollegeMilestone = {
  readonly year: number;
  readonly title: string;
  readonly body: string;
  readonly photo?: ContentImage;
};

export type CollegeMilestonesCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly milestones: readonly CollegeMilestone[];
};

const MILESTONE_PHOTO_SIZES =
  "(min-width: 1568px) 700px, (min-width: 640px) 45vw, 90vw";

export function CollegeMilestones({
  copy,
}: {
  readonly copy: CollegeMilestonesCopy;
}) {
  if (copy.milestones.length === 0) return null;

  return (
    <section className="gutter-x section-y" id="milestones">
      <div className="mx-auto max-w-page">
        <Reveal className="lg:max-w-2xl" stagger={0.08}>
          <RevealItem>
            <Eyebrow>{copy.eyebrow}</Eyebrow>
          </RevealItem>

          <SplitText
            as="h2"
            className="mt-4 font-display text-5xl font-normal text-balance text-ink"
          >
            {copy.heading}
          </SplitText>
        </Reveal>

        <Reveal className="mt-14 lg:mt-20" stagger={0.12} y={24}>
          <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {copy.milestones.map((milestone) => (
              <li
                className="flex flex-col border-t border-border pt-6"
                data-reveal-item=""
                key={milestone.year}
              >
                <time
                  className="block font-display text-4xl text-accent tabular-nums"
                  dateTime={String(milestone.year)}
                >
                  {milestone.year}
                </time>

                <H4 as="h3" className="mt-4 text-ink">
                  {milestone.title}
                </H4>
                <P className={cn("mt-3", milestone.photo ? "mb-8" : null)}>
                  {milestone.body}
                </P>

                {milestone.photo ? (
                  <Image
                    alt={milestone.photo.alt}
                    className="mt-auto aspect-video w-full rounded-media object-cover"
                    height={milestone.photo.height}
                    sizes={MILESTONE_PHOTO_SIZES}
                    src={milestone.photo.src}
                    width={milestone.photo.width}
                  />
                ) : null}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
