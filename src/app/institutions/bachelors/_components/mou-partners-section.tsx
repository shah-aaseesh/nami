import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
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
    logo: "/partners/mou/websurfer.png",
    domain: "Broadband & Telecommunications",
    logoClass: "h-11 w-auto max-w-[185px]",
  },
  {
    id: "machan",
    organization: "Machan Wildlife Resort Pvt. Ltd",
    logo: "/partners/mou/machan.png",
    domain: "Eco-Tourism & Hospitality",
    logoClass: "h-14 w-auto max-w-[145px]",
  },
  {
    id: "suraj-interior",
    organization: "Suraj Interior And Designers Pvt. Ltd",
    logo: "/partners/mou/suraj-interior.svg",
    domain: "Architecture & Interior Design",
    logoClass: "h-11 w-auto max-w-[185px]",
  },
  {
    id: "cross-web",
    organization: "Cross Web Office Automation Pvt. Ltd",
    logo: "/partners/mou/cross-web.svg",
    domain: "Office Automation & IT Solutions",
    logoClass: "h-11 w-auto max-w-[185px]",
  },
  {
    id: "startup-discovery",
    organization: "Startup Discovery Asia",
    logo: "/partners/mou/startup-discovery-asia.svg",
    domain: "Incubation & Venture Acceleration",
    logoClass: "h-11 w-auto max-w-[185px]",
  },
];

export function MouPartnersSection({
  className,
  id = "mou-partners",
}: {
  readonly className?: string;
  readonly id?: string;
}) {
  return (
    <section
      className={cn(
        "gutter-x section-y relative overflow-hidden bg-muted/25",
        className,
      )}
      id={id}
    >
      {/* Ambient Red Glow for Depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-96 rounded-full bg-[#BD1B21]/5 blur-3xl"
      />

      <div className="mx-auto max-w-page relative">
        <SectionHeader
          description="Naaya Aayam Multi-Disciplinary Institute establishes institutional MoUs with leading enterprises across technology, hospitality, architecture, and innovation sectors to foster real-world industrial exposure, student internships, and dynamic career pathways."
          eyebrow="Strategic Alliances"
          layout="split"
          title="MoU Signed Partners"
        />

        <Reveal className="mt-8 sm:mt-10 lg:mt-12" stagger={0.07}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {MOU_PARTNERS.map((partner) => (
              <RevealItem key={partner.id}>
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-surface p-5 shadow-2xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[#BD1B21]/40 hover:shadow-xl hover:shadow-[#BD1B21]/10">
                  {/* Top Red Accent Line */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#BD1B21] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Logo Display Stage - Perfectly Balanced Equal Sizing */}
                  <div className="relative flex h-24 w-full items-center justify-center rounded-xl bg-white px-4 py-2 border border-border/40 shadow-xs transition-all duration-300 group-hover:border-[#BD1B21]/20 group-hover:shadow-md">
                    <div className="flex items-center justify-center size-full">
                      <Image
                        alt={`${partner.organization} logo`}
                        className={cn(
                          "object-contain transition-transform duration-300 group-hover:scale-105",
                          partner.logoClass,
                        )}
                        height={60}
                        loading="lazy"
                        src={partner.logo}
                        width={190}
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
              </RevealItem>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
