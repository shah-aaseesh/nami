import { Reveal } from "@/components/motion/reveal";
import { Display, Eyebrow, Standfirst } from "@/components/ui/typography";

export type GalleryMastheadCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst: string;
};

export function GalleryMasthead({ copy }: { copy: GalleryMastheadCopy }) {
  return (
    <div className="mt-10 lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-x-10">
      <Reveal atFold className="lg:col-span-7">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <Display className="mt-5">{copy.heading}</Display>
      </Reveal>

      <Standfirst className="mt-8 max-w-xl text-pretty text-ink-muted lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
        {copy.standfirst}
      </Standfirst>
    </div>
  );
}
