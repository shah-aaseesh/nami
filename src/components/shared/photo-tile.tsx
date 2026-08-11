import Image from "next/image";
import type { GalleryItem } from "@/lib/content";
import { cn } from "@/lib/utils";

export function PhotoTile({
  className,
  item,
  sizes,
}: {
  readonly className?: string;
  readonly item: GalleryItem;
  readonly sizes: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-media bg-muted",
        className,
      )}
    >
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
  );
}
