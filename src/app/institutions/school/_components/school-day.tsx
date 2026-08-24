import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, H5, P, Standfirst } from "@/components/ui/typography";
import type { ContentImage } from "@/lib/content";
import { cn } from "@/lib/utils";

export type SchoolCampusEntry = {
  readonly title: string;
  readonly body: string;
  readonly photo?: ContentImage;
};

export type SchoolDayCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly campusLabel: string;
  readonly campus: readonly SchoolCampusEntry[];
};

const CAMPUS_PHOTO_SIZES =
  "(min-width: 1568px) 460px, (min-width: 1024px) 29vw, (min-width: 640px) 45vw, 90vw";

export function SchoolDay({
  copy,
  id,
}: {
  readonly copy: SchoolDayCopy;
  readonly id?: string;
}) {
  return (
    <section className="field-brand gutter-x section-y" id={id}>
      <div className="mx-auto max-w-page">
        <Reveal className="lg:grid lg:grid-cols-12 lg:gap-x-10" stagger={0.08}>
          <div className="lg:col-span-6">
            <RevealItem>
              <Eyebrow>{copy.eyebrow}</Eyebrow>
            </RevealItem>
            <SplitText
              as="h2"
              className="mt-4 font-display text-5xl font-normal text-balance text-ink"
            >
              {copy.heading}
            </SplitText>
          </div>

          <RevealItem className="mt-8 max-w-xl lg:col-span-5 lg:col-start-8 lg:mt-0 lg:self-end">
            <Standfirst>{copy.standfirst}</Standfirst>
          </RevealItem>
        </Reveal>

        <Reveal className="mt-14 lg:mt-20" stagger={0.05} y={24}>
          <RevealItem>
            <Eyebrow>{copy.campusLabel}</Eyebrow>
          </RevealItem>

          <ul className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-14">
            {copy.campus.map((entry) => (
              <li data-reveal-item="" key={entry.title}>
                {entry.photo ? (
                  <Image
                    alt={entry.photo.alt}
                    className="aspect-square w-full rounded-media object-cover"
                    height={entry.photo.height}
                    sizes={CAMPUS_PHOTO_SIZES}
                    src={entry.photo.src}
                    width={entry.photo.width}
                  />
                ) : null}

                <H5
                  as="h3"
                  className={cn("text-ink", entry.photo ? "mt-5" : null)}
                >
                  {entry.title}
                </H5>
                <P className="mt-2">{entry.body}</P>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
