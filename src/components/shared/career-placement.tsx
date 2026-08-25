import Image from "next/image";
import { SectionHeader } from "@/components/shared/section-header";
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
        <SectionHeader
          animated={false}
          eyebrow={copy.heading}
          title={copy.eyebrow ?? "Placement & Internship"}
        />

        <div className="mt-6 sm:mt-8 lg:mt-10 grid items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <div className="relative aspect-video lg:aspect-[16/10] overflow-hidden rounded-2xl lg:col-span-4 shadow-md w-full max-w-md lg:max-w-none mx-auto lg:mx-0">
            <Image
              alt={copy.image.alt}
              className="object-cover"
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 28vw, 92vw"
              src={copy.image.src}
            />
          </div>

          <div className="flex flex-col justify-center lg:col-span-8 min-w-0">
            <PartnerCarousel items={partners} label={copy.label} />
          </div>
        </div>
      </div>
    </section>
  );
}
