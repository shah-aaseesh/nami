import type { Metadata } from "next";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { content } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { galleryCopy, galleryTrail } from "./_components/gallery-copy";
import { GalleryGrid } from "./_components/gallery-grid";
import { GalleryMasthead } from "./_components/gallery-masthead";

export const metadata: Metadata = createMetadata({
  path: "/gallery",
  title: galleryCopy.meta.title,
  description: galleryCopy.meta.description,
});

export default async function GalleryPage() {
  const items = await content.getGallery();

  return (
    <section className="gutter-x section-y">
      <div className="mx-auto max-w-page">
        <Breadcrumb trail={galleryTrail} />
        <GalleryMasthead copy={galleryCopy.masthead} />
        <GalleryGrid items={items} />
      </div>
    </section>
  );
}
