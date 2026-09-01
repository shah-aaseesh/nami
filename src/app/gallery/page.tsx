import type { Metadata } from "next";
import { Suspense } from "react";

import { createMetadata } from "@/lib/seo";
import { galleryCopy } from "./_components/gallery-copy";
import { GalleryMasthead } from "./_components/gallery-masthead";
import { GalleryView } from "./_components/gallery-view";

export const metadata: Metadata = createMetadata({
  path: "/gallery",
  title: galleryCopy.meta.title,
  description: galleryCopy.meta.description,
});

export default function GalleryPage() {
  return (
    <>
      <GalleryMasthead copy={galleryCopy.masthead} />
      <Suspense fallback={null}>
        <GalleryView />
      </Suspense>
    </>
  );
}
