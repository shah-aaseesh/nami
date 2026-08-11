import { PhotoTile } from "@/components/shared/photo-tile";
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
      <PhotoTile className="h-full" item={item} sizes={sizes} />
    </figure>
  );
}
