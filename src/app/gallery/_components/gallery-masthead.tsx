import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, Standfirst } from "@/components/ui/typography";

export type GalleryMastheadCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst: string | null;
};

export function GalleryMasthead({
  copy,
}: {
  readonly copy: GalleryMastheadCopy;
}) {
  return (
    <section className="gutter-x pt-10 sm:pt-14 pb-8 sm:pb-10">
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 items-end">
          <Reveal className="lg:col-span-7" stagger={0.08}>
            <RevealItem>
              <Eyebrow className="text-[#BD1B21] font-semibold tracking-wider">
                {copy.eyebrow}
              </Eyebrow>
            </RevealItem>
            <SplitText
              as="h1"
              className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl font-normal text-ink leading-[1.1] tracking-tight"
            >
              {copy.heading}
            </SplitText>
          </Reveal>

          {copy.standfirst ? (
            <Reveal className="mt-6 max-w-xl lg:col-span-5 lg:mt-0">
              <Standfirst className="text-base sm:text-lg text-ink-muted leading-relaxed">
                {copy.standfirst}
              </Standfirst>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
