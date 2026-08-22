import type { Route } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Display, Eyebrow, Standfirst } from "@/components/ui/typography";
import type { SocialPlatform } from "@/lib/content";
import { content } from "@/lib/content";
import type { IconSvgElement } from "@/lib/icons";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TikTokIcon,
  YouTubeIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";
import { contactCopy } from "./contact-copy";

const SOCIAL_GLYPHS: Record<SocialPlatform, IconSvgElement> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  tiktok: TikTokIcon,
  youtube: YouTubeIcon,
};

export async function ContactMasthead() {
  const institution = await content.getInstitution();
  const { contact } = institution;
  const copy = contactCopy.masthead;

  const email = contact.email;
  const phones = contact.phones;
  const socials = contact.socialProfiles.filter(
    (profile) => profile.destination === "external",
  );

  return (
    <section className="gutter-x section-y-masthead">
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <Display className="mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              {copy.heading}
            </Display>
          </div>
          <Standfirst className="mt-8 max-w-xl lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
            {copy.standfirst}
          </Standfirst>
        </div>

        <div className="mt-14 grid gap-y-10 border-t pt-10 sm:grid-cols-2 sm:gap-x-10 lg:mt-20 lg:grid-cols-12">
          {email === null ? null : (
            <div className="lg:col-span-5">
              <Eyebrow as="h2" className="text-ink-muted">
                {copy.emailLabel}
              </Eyebrow>
              <Link
                className="mt-4 inline-block max-w-full truncate font-body text-lg text-accent underline underline-offset-4 transition-colors hover:text-ink sm:text-xl"
                href={`mailto:${email}` as Route}
              >
                {email}
              </Link>
            </div>
          )}

          {phones.length === 0 ? null : (
            <div className="lg:col-span-3 lg:col-start-6">
              <Eyebrow as="h2" className="text-ink-muted">
                {copy.phoneLabel}
              </Eyebrow>
              <ul className="mt-4 flex flex-col items-start gap-y-1">
                {phones.map((phone) => (
                  <li key={phone}>
                    <Link
                      className="font-body text-xl text-accent underline underline-offset-4 transition-colors hover:text-ink"
                      href={`tel:${phone.replace(/\s+/g, "")}` as Route}
                    >
                      {phone}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {socials.length === 0 ? null : (
            <div className="lg:col-span-3 lg:col-start-10">
              <Eyebrow as="h2" className="text-ink-muted">
                {copy.socialLabel}
              </Eyebrow>
              <ul className="mt-4 flex flex-wrap items-center gap-3">
                {socials.map((profile) => (
                  <li key={profile.href}>
                    <Link
                      className={cn(
                        buttonVariants({ size: "icon", variant: "default" }),
                        "rounded-full",
                      )}
                      href={profile.href as Route}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Icon icon={SOCIAL_GLYPHS[profile.platform]} />
                      <span className="sr-only">{profile.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
