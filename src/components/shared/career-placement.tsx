import Image from "next/image";
import { Eyebrow, H2 } from "@/components/ui/typography";
import type { ContentImage } from "@/lib/content";
import type { CareerPartner } from "./partner-carousel";
import { PartnerCarousel } from "./partner-carousel";

export type CareerPlacementCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly image: ContentImage;
  readonly label: string;
};

export function CareerPlacement({
  copy,
  id,
  partners,
}: {
  readonly copy: CareerPlacementCopy;
  readonly id?: string;
  readonly partners: readonly CareerPartner[];
}) {
  if (partners.length === 0) return null;

  return (
    <section className="gutter-x section-y" id={id}>
      <div className="mx-auto max-w-page">
        <div className="flex items-center gap-5">
          <Eyebrow>{copy.heading}</Eyebrow>
          <span className="h-px flex-1 bg-border" />
        </div>

        <H2 className="mt-4 max-w-3xl">
          {copy.eyebrow ?? "Placement & Internship"}
        </H2>

        <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-5 lg:gap-12">
          <div className="relative aspect-video overflow-hidden rounded-xl lg:col-span-2 lg:aspect-4/3 lg:self-start">
            <Image
              alt={copy.image.alt}
              className="object-cover"
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 36vw, 92vw"
              src={copy.image.src}
            />
          </div>

          <div className="lg:col-span-3">
            <PartnerCarousel items={partners} label={copy.label} />
          </div>
        </div>
      </div>
    </section>
  );
}
