import type { Route } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { content } from "@/lib/content";
import {
  ArrowRightIcon,
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

  const DOWNLOAD_OPTIONS = [
    {
      key: "school",
      label: "School",
      href: "/admissions" as Route,
    },
    {
      key: "college",
      label: "A-Levels",
      href: "/admissions" as Route,
    },
    {
      key: "bachelors",
      label: "Bachelors & Masters",
      href: "/admissions" as Route,
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
      {/* 1. Download Action (3 options flyout) */}
      <div className="group/item relative">
        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-xl text-white transition-all duration-150 hover:bg-primary-800 hover:scale-105 focus-visible:bg-primary-800 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset cursor-pointer"
          aria-label="Download Prospectus"
        >
          <Icon className="size-5 text-white" icon={DownloadIcon} />
          <span className="sr-only">Download Prospectus</span>
        </button>

        {/* Flyout Popover */}
        <div className="invisible pointer-events-none absolute right-full top-1/2 z-50 mr-3 w-48 -translate-y-1/2 -translate-x-1.5 rounded-xl border border-neutral-200/90 bg-white p-1.5 text-neutral-900 opacity-0 shadow-xl backdrop-blur-md transition-all duration-150 ease-out after:absolute after:-right-3 after:top-0 after:h-full after:w-4 group-hover/item:visible group-hover/item:pointer-events-auto group-hover/item:translate-x-0 group-hover/item:opacity-100 group-focus-within/item:visible group-focus-within/item:pointer-events-auto group-focus-within/item:translate-x-0 group-focus-within/item:opacity-100">
          <div className="absolute -right-1 top-1/2 size-2.5 -translate-y-1/2 rotate-45 border-r border-t border-neutral-200/90 bg-white" />

          <div className="relative space-y-1">
            {DOWNLOAD_OPTIONS.map((opt) => (
              <Link
                key={opt.key}
                href={opt.href}
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
