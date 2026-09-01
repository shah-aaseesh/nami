"use client";

import { useState } from "react";
import { EventAlbumView } from "./event-album-view";
import { GalleryAlbums } from "./gallery-albums";
import { type EventAlbum, eventAlbums } from "./gallery-copy";

export function GalleryView() {
  const [selectedAlbum, setSelectedAlbum] = useState<EventAlbum | null>(null);

  const handleSelectAlbum = (album: EventAlbum) => {
    setSelectedAlbum(album);
    // Smooth scroll to top of gallery area
    const el = document.getElementById("gallery-content");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBackToFolders = () => {
    setSelectedAlbum(null);
    const el = document.getElementById("gallery-content");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div id="gallery-content">
      {selectedAlbum ? (
        <EventAlbumView album={selectedAlbum} onBack={handleBackToFolders} />
      ) : (
        <GalleryAlbums albums={eventAlbums} onSelectAlbum={handleSelectAlbum} />
      )}
    </div>
  );
}
