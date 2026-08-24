import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, H6, Standfirst } from "@/components/ui/typography";
import type { ContentImage } from "@/lib/content";

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
  "(min-width: 1024px) 160px, (min-width: 640px) 144px, 112px";

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

        <Reveal className="mt-14 lg:mt-20" stagger={0.06} y={24}>
          <RevealItem>
            <Eyebrow>{copy.campusLabel}</Eyebrow>
          </RevealItem>

          <ul className="mt-8 grid border-t border-border lg:grid-cols-2 lg:gap-x-16">
            {copy.campus.map((entry) => (
              <li
                className="flex items-start gap-5 border-b border-border py-6"
                data-reveal-item=""
                key={entry.title}
              >
                {entry.photo ? (
                  <Image
                    alt={entry.photo.alt}
                    className="aspect-[4/3] h-auto w-28 shrink-0 rounded-media object-cover sm:w-36 lg:w-40"
                    height={entry.photo.height}
                    sizes={CAMPUS_PHOTO_SIZES}
                    src={entry.photo.src}
                    width={entry.photo.width}
                  />
                ) : null}

                <div className="min-w-0">
                  <H6 as="h3" className="text-ink">
                    {entry.title}
                  </H6>
                  <p className="mt-2 font-body text-sm text-ink-muted">
                    {entry.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
