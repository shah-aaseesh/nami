import { Eyebrow } from "@/components/ui/typography";
import type { CareerPartner } from "./partner-carousel";
import { PartnerCarousel } from "./partner-carousel";

export type BachelorsPartnersCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly label: string;
};

export function BachelorsPartners({
  copy,
  id,
  partners,
}: {
  readonly copy: BachelorsPartnersCopy;
  readonly id?: string;
  readonly partners: readonly CareerPartner[];
}) {
  if (partners.length === 0) return null;

  return (
    <section className="gutter-x section-y" id={id}>
      <div className="mx-auto max-w-page">
        <div className="flex items-center gap-5">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <span className="h-px flex-1 bg-border" />
        </div>

        <h2 className="mt-6 max-w-3xl font-display text-4xl font-normal text-balance text-ink lg:mt-8 lg:text-5xl">
          {copy.heading}
        </h2>
      </div>

      <div className="md:bleed-x">
        <PartnerCarousel items={partners} label={copy.label} />
      </div>
    </section>
  );
}
