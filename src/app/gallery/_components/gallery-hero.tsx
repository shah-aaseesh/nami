import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/reveal";

export function GalleryHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FAF9F6] border-b border-border/60">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] lg:min-h-[500px] xl:min-h-[540px]">
        {/* Left Content Column */}
        <div className="relative z-10 lg:col-span-6 xl:col-span-5 flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 bg-[#FAF9F6]">
          {/* Subtle Dot Matrix Pattern */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 grid grid-cols-5 gap-3 opacity-30"
          >
            {Array.from({ length: 25 }).map((_, i) => (
              <span className="size-1 rounded-full bg-[#1C1917]" key={i} />
            ))}
          </div>

          <Reveal stagger={0.07}>
            {/* 1. Eyebrow */}
            <RevealItem>
              <div className="flex items-center gap-3">
                <span className="font-body text-xs sm:text-sm font-extrabold tracking-widest text-[#8B1519] uppercase">
                  Beyond Classrooms
                </span>
                <span className="h-0.5 w-10 bg-[#8B1519]" />
              </div>
            </RevealItem>

            {/* 2. Main Headline */}
            <RevealItem>
              <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-bold text-[#1C1917] leading-[1.08] tracking-tight">
                Stories, Smiles &amp; <br />
                <span className="text-[#8B1519]">Success</span>
              </h1>
            </RevealItem>

            {/* 3. Lotus Flourish Divider */}
            <RevealItem>
              <div className="my-5 flex items-center gap-3">
                <span className="h-px w-12 bg-[#8B1519]/30" />
                <div className="relative size-6 shrink-0">
                  <Image
                    alt="NAMI Lotus"
                    className="size-full object-contain"
                    height={24}
                    src="/lotus.png"
                    width={24}
                  />
                </div>
                <span className="h-px w-12 bg-[#8B1519]/30" />
              </div>
            </RevealItem>

            {/* 4. Standfirst Copy */}
            <RevealItem>
              <p className="max-w-md font-body text-sm sm:text-base text-[#525252] leading-relaxed">
                A glimpse into the vibrant life at NAMI College where every moment shapes a brighter future.
              </p>
            </RevealItem>
          </Reveal>

          {/* 5. Breadcrumbs */}
          <div className="mt-8 sm:mt-12 pt-4">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 font-body text-xs sm:text-sm text-[#737373]"
            >
              <Link
                className="flex items-center gap-1.5 text-[#8B1519] transition-opacity hover:opacity-80"
                href="/"
              >
                <svg
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span>Home</span>
              </Link>
              <span className="text-[#A3A3A3]">&gt;</span>
              <span className="font-semibold text-[#8B1519]">Gallery</span>
            </nav>
          </div>
        </div>

        {/* Right Column: Campus Image with Organic Crimson Wave Divider */}
        <div className="relative lg:col-span-6 xl:col-span-7 min-h-[320px] lg:min-h-full overflow-hidden bg-neutral-900">
          {/* Organic Crimson Wave Divider (Desktop Only) */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute -left-1 inset-y-0 w-28 z-20 pointer-events-none"
          >
            <svg
              className="size-full text-[#8B1519]"
              fill="currentColor"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <path d="M0,0 Q60,25 20,50 T0,100 L0,100 Z" fill="#FAF9F6" />
              <path d="M0,0 Q65,25 25,50 T0,100 L12,100 Q40,75 35,50 Q45,25 0,0 Z" fill="#8B1519" />
            </svg>
          </div>

          {/* Campus Building & Students Photograph */}
          <Image
            alt="Students walking towards NAMI College campus building"
            className="size-full object-cover object-center"
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            src="/nami/gallery-campus-building.png"
          />

          {/* Soft inner shadow for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
