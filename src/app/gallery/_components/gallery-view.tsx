"use client";

import { useState } from "react";
import type { EntityRole, GalleryItem, NamedEntity } from "@/lib/content";
import { GalleryAlbums } from "./gallery-albums";
import { GalleryArchive } from "./gallery-archive";
import { type CuratedAlbum, curatedAlbums, galleryCopy } from "./gallery-copy";

export function GalleryView({
  entities,
  items,
}: {
  readonly entities: Readonly<Record<EntityRole, NamedEntity>>;
  readonly items: readonly GalleryItem[];
}) {
  const [selectedAlbum, setSelectedAlbum] = useState<CuratedAlbum | null>(null);

  const handleSelectAlbum = (album: CuratedAlbum) => {
    setSelectedAlbum(album);
    const archiveEl = document.getElementById("gallery-archive");
    if (archiveEl) {
      archiveEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleResetAlbum = () => {
    setSelectedAlbum(null);
  };

  return (
    <>
      <GalleryAlbums
        albums={curatedAlbums}
        copy={galleryCopy.albumsSection}
        onSelectAlbum={handleSelectAlbum}
      />
      <GalleryArchive
        entities={entities}
        items={items}
        onResetAlbum={handleResetAlbum}
        selectedAlbum={selectedAlbum}
      />
    </>
  );
}
