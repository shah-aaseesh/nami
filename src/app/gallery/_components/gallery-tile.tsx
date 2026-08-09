import Image from "next/image";
import type { GalleryItem } from "@/lib/content";
import { cn } from "@/lib/utils";

export function GalleryTile({
  className,
  item,
  rowSpan,
  sizes,
}: {
  readonly className?: string;
  readonly item: GalleryItem;
  readonly rowSpan: number;
  readonly sizes: string;
}) {
  // Shorthand, not gridRowEnd: Flip records/restores inline `gridArea`, and a bare
  // longhand serialises that shorthand to "", so Flip strips the span on a re-pack.
  const area = `auto / auto / span ${rowSpan} / auto`;

  return (
    <figure
      className={cn("group h-full pb-[var(--gallery-gutter)]", className)}
      data-gallery-tile={item.id}
      style={{ gridArea: area }}
    >
      <div className="relative h-full overflow-hidden rounded-media bg-muted">
        <Image
          alt={item.image.alt}
          className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
          fill
          sizes={sizes}
          src={item.image.src}
        />
        <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/10 to-transparent p-2 pt-4 text-white sm:p-3 sm:pt-6">
          <span className="line-clamp-1 font-body text-xs font-medium leading-snug">
            {item.title}
          </span>
        </figcaption>
      </div>
    </figure>
  );
}
