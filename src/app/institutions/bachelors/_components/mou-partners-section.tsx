"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Icon } from "@/components/ui/icon";
import { CheckIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type MouPartner = {
  readonly id: string;
  readonly organization: string;
  readonly logo: string;
  readonly domain: string;
  readonly logoClass?: string;
};

export const MOU_PARTNERS: readonly MouPartner[] = [
  {
    id: "websurfer",
    organization: "Web Surfer The Broad Band Company",
    logo: "/mou bachelors/websurfer-logo-brighter1920x658-removebg-preview.png",
    domain: "Broadband & Telecommunications",
    logoClass: "max-h-20 w-auto max-w-[210px] sm:max-w-[230px]",
  },
  {
    id: "machan",
    organization: "Machan Wildlife Resort Pvt. Ltd",
    logo: "/mou bachelors/machian-removebg-preview.png",
    domain: "Eco-Tourism & Hospitality",
    logoClass: "max-h-24 w-auto max-w-[170px] sm:max-w-[190px]",
  },
  {
    id: "suraj-interior",
    organization: "Suraj Interior And Designers Pvt. Ltd",
    logo: "/mou bachelors/Suraj-removebg-preview.png",
    domain: "Architecture & Interior Design",
    logoClass: "max-h-24 w-auto max-w-[160px] sm:max-w-[180px]",
  },
  {
    id: "cross-web",
    organization: "Cross Web Office Automation Pvt. Ltd",
    logo: "/mou bachelors/Cross_web-removebg-preview.png",
    domain: "Office Automation & IT Solutions",
    logoClass: "max-h-22 w-auto max-w-[180px] sm:max-w-[200px]",
  },
  {
    id: "startup-discovery",
    organization: "Startup Discovery Asia",
    logo: "/mou bachelors/Startup_Discovery-removebg-preview.png",
    domain: "Incubation & Venture Acceleration",
    logoClass: "max-h-20 w-auto max-w-[210px] sm:max-w-[230px]",
  },
];

export function MouPartnersSection({
  className,
  id = "mou-partners",
}: {
  readonly className?: string;
  readonly id?: string;
}) {
  const total = MOU_PARTNERS.length;

  // Duplicate for smooth, uninterrupted carousel looping across all viewport widths
  const displayPartners =
    total > 1 && total < 8
      ? [
          ...MOU_PARTNERS.map((p) => ({ ...p, itemKey: `${p.id}-1` })),
          ...MOU_PARTNERS.map((p) => ({ ...p, itemKey: `${p.id}-2` })),
        ]
      : MOU_PARTNERS.map((p) => ({ ...p, itemKey: p.id }));

  return (
    <section
      className={cn(
        "gutter-x section-y relative overflow-hidden bg-muted/25 border-t border-border/80",
        className,
      )}
      id={id}
    >
      {/* Ambient Brand Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-96 rounded-full bg-[#BD1B21]/5 blur-3xl"
      />

      <Carousel
        aria-label="MoU Signed Partners"
        aria-roledescription="carousel"
        autoplay={true}
        autoplayIntervalMs={2500}
        opts={{
          align: "start",
          duration: 35,
          loop: true,
          slidesToScroll: 1,
        }}
        pauseOnHover={false}
      >
        <div className="mx-auto max-w-page relative">
          <SectionHeader
            action={
              <CarouselControls className="ms-auto">
                <CarouselPrevious
                  aria-label="Previous partner"
                  className="size-9 sm:size-11 [&_svg]:size-4 sm:[&_svg]:size-5"
                />
                <CarouselNext
                  aria-label="Next partner"
                  className="size-9 sm:size-11 [&_svg]:size-4 sm:[&_svg]:size-5"
                />
              </CarouselControls>
            }
            description="Naaya Aayam Multi-Disciplinary Institute establishes institutional MoUs with leading enterprises across technology, hospitality, architecture, and innovation sectors to foster real-world industrial exposure, student internships, and dynamic career pathways."
            eyebrow="Strategic Alliances"
            layout="action"
            title="MoU Signed Partners"
          />
        </div>

        <Reveal className="mx-auto mt-8 max-w-page sm:mt-10 lg:mt-12" y={24}>
          <CarouselContent className="-ms-4 sm:-ms-5 lg:-ms-6">
            {displayPartners.map((partner) => (
              <CarouselItem
                className="basis-[78vw] ps-4 sm:basis-[260px] sm:ps-5 md:basis-[280px] lg:basis-[290px] lg:ps-6 xl:basis-[300px]"
                key={partner.itemKey}
              >
                <div className="group relative flex h-full min-h-[340px] flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-surface p-5 shadow-2xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[#BD1B21]/40 hover:shadow-xl hover:shadow-[#BD1B21]/10">
                  {/* Top Red Accent Line */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#BD1B21] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Logo Display Stage - Large & Prominent */}
                  <div className="relative flex h-28 sm:h-32 w-full items-center justify-center rounded-xl bg-white px-5 py-3 border border-border/40 shadow-xs transition-all duration-300 group-hover:border-[#BD1B21]/20 group-hover:shadow-md">
                    <div className="flex items-center justify-center size-full">
                      <Image
                        alt={`${partner.organization} logo`}
                        className={cn(
                          "object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-2xs",
                          partner.logoClass,
                        )}
                        height={96}
                        loading="lazy"
                        src={partner.logo}
                        width={240}
                      />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="mt-5 flex flex-1 flex-col justify-between space-y-4">
                    <div>
                      {/* Domain Tag with NAMI Red Tint */}
                      <span className="inline-block rounded-full border border-[#BD1B21]/15 bg-[#BD1B21]/5 px-2.5 py-0.5 font-body text-[11px] font-medium text-[#BD1B21] transition-colors group-hover:bg-[#BD1B21]/10">
                        {partner.domain}
                      </span>

                      {/* Organization Name */}
                      <h3 className="mt-2.5 font-display text-sm font-semibold text-ink line-clamp-2 leading-snug transition-colors group-hover:text-[#BD1B21]">
                        {partner.organization}
                      </h3>
                    </div>

                    {/* Verified MoU Indicator with Brand Accent */}
                    <div className="flex items-center gap-2 border-t border-border/50 pt-3">
                      <span className="flex size-4 items-center justify-center rounded-full bg-[#BD1B21]/10 text-[#BD1B21] transition-transform duration-200 group-hover:scale-110">
                        <Icon className="size-2.5" icon={CheckIcon} />
                      </span>
                      <span className="font-body text-xs font-medium text-ink-muted transition-colors group-hover:text-ink">
                        Verified MoU Partner
                      </span>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Reveal>
      </Carousel>
    </section>
  );
}
