import type { Route } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { content } from "@/lib/content";
import {
  DownloadIcon,
  InstagramIcon,
  LinkedInIcon,
  TikTokIcon,
  TwitterIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";

const FLOATING_SOCIAL_LINKS = [
  {
    platform: "download",
    label: "Download",
    href: "#", // Update with actual download link if needed
    icon: DownloadIcon,
  },
  {
    platform: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/namicollege/",
    icon: InstagramIcon,
  },
  {
    platform: "twitter",
    label: "X (Twitter)",
    href: "https://twitter.com/NamiCollege",
    icon: TwitterIcon,
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/nami-college",
    icon: LinkedInIcon,
  },
  {
    platform: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/user/naminepal",
    icon: YouTubeIcon,
  },
  {
    platform: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@namicollege",
    icon: TikTokIcon,
  },
] as const;

export type FloatingSocialsProps = {
  className?: string;
};

export async function FloatingSocials({ className }: FloatingSocialsProps) {
  const institution = await content.getInstitution();
  const { whatsapp } = institution.contact;

  const links =
    whatsapp === null
      ? FLOATING_SOCIAL_LINKS
      : [
          ...FLOATING_SOCIAL_LINKS,
          {
            platform: "whatsapp",
            label: whatsapp.label,
            href: whatsapp.href,
            icon: WhatsAppIcon,
          },
        ];

  return (
    <aside
      aria-label="Social Media Links"
      className={cn(
        "fixed right-0 top-1/2 z-50 flex -translate-y-1/2 flex-col overflow-hidden rounded-l-xl bg-primary-700 shadow-lg",
        className,
      )}
    >
      <ul className="flex flex-col divide-y divide-primary-800/50">
        {links.map(({ platform, label, href, icon: SocialIcon }) => (
          <li key={platform}>
            <Link
              aria-label={label}
              className="flex size-11 items-center justify-center text-white transition-colors hover:bg-primary-800/80 focus-visible:bg-primary-800"
              href={href as Route}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon className="size-5 text-white" icon={SocialIcon} />
              <span className="sr-only">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
