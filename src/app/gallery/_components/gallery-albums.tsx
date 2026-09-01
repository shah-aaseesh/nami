"use client";

import {
  ArrowRight01Icon,
  Image01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { Icon } from "@/components/ui/icon";
import { H4, P } from "@/components/ui/typography";
import type { CuratedAlbum } from "./gallery-copy";

export function GalleryAlbums({
  albums,
  copy,
  onSelectAlbum,
}: {
  readonly albums: readonly CuratedAlbum[];
  readonly copy: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly standfirst: string;
  };
  readonly onSelectAlbum: (album: CuratedAlbum) => void;
}) {
  return (
    <section className="gutter-x pb-12 sm:pb-16" id="gallery-albums">
      <div className="mx-auto max-w-page">
        <SectionHeader
          description={copy.standfirst}
          eyebrow={copy.heading}
          layout="split"
          title={copy.eyebrow}
        />

        <Reveal className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6">
          {albums.map((album) => (
            <RevealItem key={album.id}>
              <button
                className="group relative flex flex-col h-full w-full text-left rounded-2xl overflow-hidden border border-border/80 bg-surface-raised shadow-2xs transition-all duration-300 hover:border-accent/60 hover:shadow-md cursor-pointer"
                onClick={() => onSelectAlbum(album)}
                type="button"
              >
                {/* Album Cover */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
                  <Image
                    alt={album.image.alt}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    fill
                    sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    src={album.image.src}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  {/* Album Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-medium text-white border border-white/15">
                      <Icon
                        className="size-3 text-accent"
                        icon={SparklesIcon}
                      />
                      {album.tag}
                    </span>
                  </div>

                  {/* Count Pill */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white/90">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium drop-shadow-sm">
                      <Icon
                        className="size-3.5 text-white/80"
                        icon={Image01Icon}
                      />
                      {album.countLabel}
                    </span>
                  </div>
                </div>

                {/* Album Content */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                  <div>
                    <H4 className="text-base font-semibold text-ink group-hover:text-accent transition-colors line-clamp-1">
                      {album.title}
                    </H4>
                    <P className="mt-1.5 text-xs text-ink-muted leading-relaxed line-clamp-2">
                      {album.description}
                    </P>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-medium text-accent">
                    <span>Explore collection</span>
                    <Icon
                      className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      icon={ArrowRight01Icon}
                    />
                  </div>
                </div>
              </button>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
