import type { Route } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { content } from "@/lib/content";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  DownloadIcon,
  LinkedInIcon,
  WhatsappIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";

export type FloatingSocialsProps = {
  className?: string;
};

function formatWhatsAppLink(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export async function FloatingSocials({ className }: FloatingSocialsProps) {
  const institution = await content.getInstitution();
  const { contact } = institution;

  const primaryPhone =
    contact.phones[0] ?? contact.byEntity.institute.phone ?? "+977 1 4917444";
  const whatsappUrl = formatWhatsAppLink(
    primaryPhone,
    "Hello NAMI, I would like to enquire about admissions and programmes.",
  );

  const linkedinUrl =
    contact.socialProfiles.find((s) => s.platform === "linkedin")?.href ??
    "https://www.linkedin.com/company/nami-college";

  const DOWNLOAD_CATEGORIES = [
    {
      id: "applications",
      label: "Application Forms",
      items: [
        {
          key: "primary-app",
          label: "Primary School",
          href: "/Nami International School (Primary) Admission form.pdf" as Route,
          isPdf: true,
        },
        {
          key: "plus2-app",
          label: "+2 NEB",
          href: "/Application_form_nami_international_school_plus_2.pdf" as Route,
          isPdf: true,
        },
        {
          key: "alevels-app",
          label: "A-Levels",
          href: "/NAMI_College_A_Level_Application_Form.pdf" as Route,
          isPdf: true,
        },
        {
          key: "bachelors-app",
          label: "Bachelors",
          href: "/Nami_applicationform_bachelors.pdf" as Route,
          isPdf: true,
        },
      ],
    },
    {
      id: "brochures",
      label: "Brochures",
      items: [
        {
          key: "primary-brochure",
          label: "Primary School",
          href: "/institutions/school" as Route,
          isPdf: false,
        },
        {
          key: "plus2-brochure",
          label: "+2 NEB",
          href: "/institutions/school" as Route,
          isPdf: false,
        },
        {
          key: "alevels-brochure",
          label: "A-Levels",
          href: "/institutions/a-levels" as Route,
          isPdf: false,
        },
        {
          key: "bachelors-brochure",
          label: "Bachelors",
          href: "/Nami book.pdf" as Route,
          isPdf: true,
        },
      ],
    },
  ] as const;

  return (
    <aside
      aria-label="Floating quick actions"
      className={cn(
        "fixed right-0 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-1.5 rounded-l-2xl border-y border-l border-primary-600/30 bg-primary-700 p-1.5 shadow-2xl xl:flex",
        className,
      )}
    >
      {/* 1. Download Action (2-level nested flyout) */}
      <div className="group/item relative">
        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-xl text-white transition-all duration-150 hover:bg-primary-800 hover:scale-105 focus-visible:bg-primary-800 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset cursor-pointer"
          aria-label="Download Forms & Brochures"
        >
          <Icon className="size-5 text-white" icon={DownloadIcon} />
          <span className="sr-only">Download Forms & Brochures</span>
        </button>

        {/* Level 1 Flyout: Categories (Application Forms, Brochures) */}
        <div className="invisible pointer-events-none absolute right-full top-1/2 z-50 mr-3 w-48 -translate-y-1/2 -translate-x-1.5 rounded-xl border border-neutral-200/90 bg-white p-1.5 text-neutral-900 opacity-0 shadow-xl backdrop-blur-md transition-all duration-150 ease-out after:absolute after:-right-3 after:top-0 after:h-full after:w-4 group-hover/item:visible group-hover/item:pointer-events-auto group-hover/item:translate-x-0 group-hover/item:opacity-100 group-focus-within/item:visible group-focus-within/item:pointer-events-auto group-focus-within/item:translate-x-0 group-focus-within/item:opacity-100">
          <div className="absolute -right-1 top-1/2 size-2.5 -translate-y-1/2 rotate-45 border-r border-t border-neutral-200/90 bg-white" />

          <div className="relative space-y-1">
            {DOWNLOAD_CATEGORIES.map((cat) => (
              <div key={cat.id} className="group/cat relative">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-neutral-800 transition-colors duration-150 group-hover/cat:bg-primary-700 group-hover/cat:text-white focus-visible:outline-none focus-visible:bg-primary-700 focus-visible:text-white cursor-pointer"
                >
                  <Icon
                    className="size-3.5 shrink-0 text-neutral-400 transition-colors group-hover/cat:text-white"
                    icon={ChevronLeftIcon}
                  />
                  <span>{cat.label}</span>
                </button>

                {/* Level 2 Sub-Flyout: 4 Subcategories */}
                <div className="invisible pointer-events-none absolute right-full -top-1.5 z-50 mr-2.5 w-48 -translate-x-1.5 rounded-xl border border-neutral-200/90 bg-white p-1.5 text-neutral-900 opacity-0 shadow-xl backdrop-blur-md transition-all duration-150 ease-out after:absolute after:-right-3 after:top-0 after:h-full after:w-4 group-hover/cat:visible group-hover/cat:pointer-events-auto group-hover/cat:translate-x-0 group-hover/cat:opacity-100 group-focus-within/cat:visible group-focus-within/cat:pointer-events-auto group-focus-within/cat:translate-x-0 group-focus-within/cat:opacity-100">
                  <div className="absolute -right-1 top-3.5 size-2.5 rotate-45 border-r border-t border-neutral-200/90 bg-white" />

                  <div className="relative space-y-1">
                    {cat.items.map((opt) => (
                      <Link
                        key={opt.key}
                        href={opt.href}
                        target={opt.isPdf ? "_blank" : undefined}
                        rel={opt.isPdf ? "noopener noreferrer" : undefined}
                        download={opt.isPdf ? true : undefined}
                        className="group/opt flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-neutral-800 transition-colors duration-150 hover:bg-primary-700 hover:text-white focus-visible:outline-none focus-visible:bg-primary-700 focus-visible:text-white"
                      >
                        <span className="truncate">{opt.label}</span>
                        <Icon
                          className="size-3.5 shrink-0 text-neutral-400 transition-colors group-hover/opt:text-white"
                          icon={ArrowRightIcon}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Direct WhatsApp Action (1 link) */}
      <div className="group/item relative">
        <Link
          href={whatsappUrl as Route}
          target="_blank"
          rel="noopener noreferrer"
          className="flex size-10 items-center justify-center rounded-xl text-white transition-all duration-150 hover:bg-primary-800 hover:scale-105 focus-visible:bg-primary-800 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset cursor-pointer"
          aria-label="Chat on WhatsApp"
        >
          <Icon className="size-5 text-white" icon={WhatsappIcon} />
          <span className="sr-only">Chat on WhatsApp</span>
        </Link>

        {/* Tooltip */}
        <div className="invisible pointer-events-none absolute right-full top-1/2 z-50 mr-3 -translate-y-1/2 -translate-x-1.5 whitespace-nowrap rounded-lg border border-neutral-200/90 bg-white px-2.5 py-1 text-xs font-medium text-neutral-800 opacity-0 shadow-lg transition-all duration-150 ease-out group-hover/item:visible group-hover/item:translate-x-0 group-hover/item:opacity-100 group-focus-within/item:visible group-focus-within/item:translate-x-0 group-focus-within/item:opacity-100">
          <div className="absolute -right-1 top-1/2 size-2 -translate-y-1/2 rotate-45 border-r border-t border-neutral-200/90 bg-white" />
          <span>Chat on WhatsApp</span>
        </div>
      </div>

      {/* 3. Direct LinkedIn Action */}
      <div className="group/item relative">
        <Link
          href={linkedinUrl as Route}
          target="_blank"
          rel="noopener noreferrer"
          className="flex size-10 items-center justify-center rounded-xl text-white transition-all duration-150 hover:bg-primary-800 hover:scale-105 focus-visible:bg-primary-800 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset cursor-pointer"
          aria-label="Connect on LinkedIn"
        >
          <Icon className="size-5 text-white" icon={LinkedInIcon} />
          <span className="sr-only">Connect on LinkedIn</span>
        </Link>

        {/* Tooltip */}
        <div className="invisible pointer-events-none absolute right-full top-1/2 z-50 mr-3 -translate-y-1/2 -translate-x-1.5 whitespace-nowrap rounded-lg border border-neutral-200/90 bg-white px-2.5 py-1 text-xs font-medium text-neutral-800 opacity-0 shadow-lg transition-all duration-150 ease-out group-hover/item:visible group-hover/item:translate-x-0 group-hover/item:opacity-100 group-focus-within/item:visible group-focus-within/item:translate-x-0 group-focus-within/item:opacity-100">
          <div className="absolute -right-1 top-1/2 size-2 -translate-y-1/2 rotate-45 border-r border-t border-neutral-200/90 bg-white" />
          <span>Connect on LinkedIn</span>
        </div>
      </div>
    </aside>
  );
}
