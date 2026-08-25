import type { Metadata } from "next";
import { Suspense } from "react";

import { P } from "@/components/ui/typography";
import { content } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { GalleryArchive } from "./_components/gallery-archive";
import { galleryCopy } from "./_components/gallery-copy";
import { GalleryMasthead } from "./_components/gallery-masthead";

export const metadata: Metadata = createMetadata({
  path: "/gallery",
  title: galleryCopy.meta.title,
  description: galleryCopy.meta.description,
});

export default async function GalleryPage() {
  const [items, institution] = await Promise.all([
    content.getGallery(),
    content.getInstitution(),
  ]);

  return (
    <>
      <GalleryMasthead copy={galleryCopy.masthead} />
      {items.length === 0 ? (
        <section className="gutter-x section-y border-t border-border">
          <div className="mx-auto max-w-page">
            <P className="max-w-xl">{galleryCopy.emptyArchive}</P>
          </div>
        </section>
      ) : (
        <Suspense fallback={null}>
          <GalleryArchive entities={institution.entities} items={items} />
        </Suspense>
      )}
    </>
  );
}
