import type { Route } from "next";
import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { PhotoTile } from "@/components/shared/photo-tile";
import { SectionHeader } from "@/components/shared/section-header";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import type { EntityRole, GalleryItem } from "@/lib/content";
import { content } from "@/lib/content";
import { ArrowRightIcon } from "@/lib/icons";
import { INSTITUTION_PARAM } from "@/lib/institution-filter";
import { cn } from "@/lib/utils";

export type InstitutionGalleryCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst?: string;
  readonly ctaLabel: string;
  readonly ctaAccessibleLabel?: string;
};

export type InstitutionGalleryTone = "surface" | "ink" | "brand";

const BENTO_TILE_COUNT = 5;

const BENTO_SIZES = {
  dominant: "(min-width: 1568px) 708px, (min-width: 768px) 45vw, 92vw",
  wide: "(min-width: 1568px) 464px, (min-width: 768px) 30vw, 45vw",
  square: "(min-width: 1568px) 220px, (min-width: 768px) 15vw, 45vw",
} as const;

const FALLBACK_SIZES =
  "(min-width: 1568px) 342px, (min-width: 768px) 22vw, 45vw";

const bentoSlots = [
  {
    cell: "col-span-2 md:col-start-1 md:row-start-1 md:col-span-3 md:row-span-2",
    sizes: BENTO_SIZES.dominant,
  },
  {
    cell: "col-span-1 md:col-start-4 md:row-start-1 md:col-span-2 md:row-span-1",
    sizes: BENTO_SIZES.wide,
  },
  {
    cell: "col-span-1 md:col-start-4 md:row-start-2 md:col-span-2 md:row-span-1",
    sizes: BENTO_SIZES.wide,
  },
  {
    cell: "col-span-1 md:col-start-6 md:row-start-1 md:col-span-1 md:row-span-1",
    sizes: BENTO_SIZES.square,
  },
  {
    cell: "col-span-1 md:col-start-6 md:row-start-2 md:col-span-1 md:row-span-1",
    sizes: BENTO_SIZES.square,
  },
] as const;

function imageArea(item: GalleryItem) {
  return item.image.width * item.image.height;
}

export async function InstitutionGallery({
  copy,
  id,
  institution,
  tone = "brand",
}: {
  readonly copy: InstitutionGalleryCopy;
  readonly id?: string;
  readonly institution: EntityRole;
  readonly tone?: InstitutionGalleryTone;
}) {
  const gallery = await content.getGallery();
  const photographs = gallery.filter(
    (entry) => entry.institution === institution,
  );

  if (photographs.length === 0) return null;

  const selected = photographs.slice(0, BENTO_TILE_COUNT);
  const isBento = selected.length === BENTO_TILE_COUNT;
  const ranked = isBento
    ? [...selected].sort((a, b) => imageArea(b) - imageArea(a))
    : selected;

  const href =
    `/gallery?${INSTITUTION_PARAM}=${institution}` as Route<`/gallery?${string}`>;

  return (
    <section
      className={cn(
        "gutter-x section-y",
        tone === "brand" && "field-brand",
        tone === "ink" && "field-ink",
      )}
      id={id}
    >
      <div className="mx-auto max-w-page">
        <SectionHeader
          action={
            <Link
              aria-label={copy.ctaAccessibleLabel}
              className={cn(buttonVariants({ size: "lg", variant: "default" }))}
              href={href}
            >
              {copy.ctaLabel}
              <Icon icon={ArrowRightIcon} />
            </Link>
          }
          eyebrow={copy.heading}
          layout="action"
          title={copy.eyebrow}
        />

        {isBento ? (
          <Reveal
            className="@container mt-12 grid grid-cols-2 gap-4 auto-rows-[var(--bento-row)] [--bento-row:calc(100cqw/2)] md:mt-16 md:grid-cols-6 md:gap-6 md:[--bento-row:calc(100cqw/6)]"
            stagger={0.08}
            y={28}
          >
            {ranked.map((item, index) => (
              <RevealItem className={bentoSlots[index]?.cell} key={item.id}>
                <figure className="group h-full">
                  <PhotoTile
                    className="h-full"
                    item={item}
                    sizes={bentoSlots[index]?.sizes ?? BENTO_SIZES.square}
                  />
                </figure>
              </RevealItem>
            ))}
          </Reveal>
        ) : (
          <Reveal
            className="mt-12 grid grid-cols-2 gap-4 md:mt-16 md:grid-cols-4 md:gap-6"
            stagger={0.08}
            y={28}
          >
            {ranked.map((item) => (
              <RevealItem key={item.id}>
                <figure className="group">
                  <PhotoTile
                    className="aspect-[4/3]"
                    item={item}
                    sizes={FALLBACK_SIZES}
                  />
                </figure>
              </RevealItem>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}
