import type { Metadata } from "next";
import { Suspense } from "react";

import { createMetadata } from "@/lib/seo";
import { galleryCopy } from "./_components/gallery-copy";
import { GalleryHero } from "./_components/gallery-hero";
import { GalleryMoments } from "./_components/gallery-moments";

export const metadata: Metadata = createMetadata({
  path: "/gallery",
  title: galleryCopy.meta.title,
  description: galleryCopy.meta.description,
});

export default function GalleryPage() {
  return (
    <main>
      <GalleryHero />
      <Suspense fallback={null}>
        <GalleryMoments />
      </Suspense>
    </main>
  );
}
