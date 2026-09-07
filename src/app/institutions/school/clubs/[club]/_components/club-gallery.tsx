import { ArrowRight01Icon, ViewIcon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import Link from "next/link";
import type { SchoolClub } from "@/app/institutions/school/_components/school-clubs-copy";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export function ClubGallery({ club }: { readonly club: SchoolClub }) {
  if (!club.galleryImages || club.galleryImages.length === 0) {
    return null;
  }

  return (
    <section
      className="gutter-x section-y bg-neutral-900 text-white overflow-hidden relative"
      id="club-gallery"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(189,27,33,0.15),transparent_70%)] pointer-events-none" />

      <div className="mx-auto max-w-page relative z-10">
        <SectionHeader
          description={`Photographic record of recent activities, fixtures, field trips, and workshops hosted by the ${club.title}.`}
          eyebrow="Club In Action"
          eyebrowClassName="text-[#F7CD00] font-semibold"
          layout="split"
          title="Moments in Action"
        />

        <Reveal
          className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          stagger={0.06}
          y={20}
        >
          {club.galleryImages.map((photo) => (
            <RevealItem className="h-full" key={photo.src}>
              <div className="group relative aspect-4/3 sm:aspect-3/4 w-full overflow-hidden rounded-2xl bg-neutral-950 border border-white/10 shadow-lg transition-all duration-500 hover:border-[#BD1B21]/60 hover:shadow-2xl">
                <Image
                  alt={photo.alt}
                  className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  height={photo.height}
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  src={photo.src}
                  width={photo.width}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />

                {/* Quick Indicator */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="flex size-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-xs">
                    <Icon className="size-4" icon={ViewIcon} />
                  </span>
                </div>
              </div>
            </RevealItem>
          ))}
        </Reveal>

        {/* View All in Main Gallery Button */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            className={cn(
              buttonVariants({ size: "default" }),
              "gap-2 bg-[#BD1B21] hover:bg-[#a0161b] text-white rounded-full px-6 py-3 font-semibold text-sm shadow-md",
            )}
            href="/gallery"
          >
            <span>Explore Full Gallery Archive</span>
            <Icon className="size-4" icon={ArrowRight01Icon} />
          </Link>
        </div>
      </div>
    </section>
  );
}
