import type { Route } from "next";
import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H3, P } from "@/components/ui/typography";
import type { Campus, EntityRole } from "@/lib/content";
import { content } from "@/lib/content";
import {
  FacebookIcon,
  GlobeIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  TikTokIcon,
  YouTubeIcon,
} from "@/lib/icons";

const MAP_ORIGIN = "https://www.google.com/maps";

function mapSrc(campus: Campus): string {
  const params = new URLSearchParams({
    q: `${campus.locality}, ${campus.city}, Nepal`,
    output: "embed",
    hl: "en",
    z: "15",
  });
  return `${MAP_ORIGIN}?${params.toString()}`;
}

const SOCIAL_ICONS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
  tiktok: TikTokIcon,
} as const;

export async function InstitutionContact({
  id = "contact",
  institution: role,
}: {
  readonly id?: string;
  readonly institution: EntityRole;
}) {
  const profile = await content.getInstitution();
  const entity = profile.entities[role];
  const entityContact = profile.contact.byEntity[role];

  const campus =
    role === "institute"
      ? (profile.campuses.find((c) => c.slug === "new-baneshwor") ??
        profile.campuses[0])
      : (profile.campuses.find((c) => c.slug === "gokarneshwor") ??
        profile.campuses[0]);

  if (!campus) return null;

  return (
    <section className="gutter-x section-y" id={id}>
      <div className="mx-auto max-w-page">
        <Reveal stagger={0.08}>
          <RevealItem className="flex items-center gap-5">
            <Eyebrow>Contact & Location</Eyebrow>
            <span className="h-px flex-1 bg-border" />
          </RevealItem>

          <div className="mt-6 sm:max-w-2xl lg:mt-8">
            <SplitText as="h2">{`Get in Touch with ${entity.name}`}</SplitText>
          </div>
        </Reveal>

        <Reveal
          className="mt-10 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-14 items-stretch"
          stagger={0.1}
          y={20}
        >
          {/* Left: Map */}
          <div className="lg:col-span-7">
            <div className="h-full min-h-[380px] overflow-hidden rounded-2xl bg-neutral-100 lg:min-h-[440px]">
              <iframe
                className="block h-full min-h-[380px] w-full lg:min-h-[440px]"
                height={600}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={mapSrc(campus)}
                title={`Map location of ${entity.name} in ${campus.locality}`}
                width={800}
              />
            </div>
          </div>

          {/* Right: Contact details */}
          <div className="flex flex-col justify-between gap-y-8 lg:col-span-5 lg:py-2">
            <div className="space-y-8">
              {/* Campus Location */}
              <div>
                <Eyebrow className="text-ink-muted">Campus Location</Eyebrow>
                <H3 className="mt-1.5 text-lg sm:text-xl font-medium text-ink">
                  {campus.locality}, {campus.city}
                </H3>
                <P className="mt-1 text-sm text-ink-muted">
                  {campus.streetAddress}
                </P>
              </div>

              {/* Direct Inquiries */}
              <div>
                <Eyebrow className="text-ink-muted">Direct Inquiries</Eyebrow>
                <ul className="mt-4 space-y-3 font-body text-base">
                  <li>
                    <Link
                      className="group flex items-center gap-3 text-ink transition-colors hover:text-accent"
                      href={
                        `tel:${entityContact.phone.replace(/[^+\d]/g, "")}` as Route
                      }
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-ink transition-colors group-hover:bg-accent group-hover:text-white">
                        <Icon className="size-4" icon={PhoneIcon} />
                      </div>
                      <span className="font-medium">{entityContact.phone}</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="group flex items-center gap-3 text-ink transition-colors hover:text-accent"
                      href={`mailto:${entityContact.email}` as Route}
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-ink transition-colors group-hover:bg-accent group-hover:text-white">
                        <Icon className="size-4" icon={MailIcon} />
                      </div>
                      <span className="font-medium">{entityContact.email}</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Social Profiles */}
            {profile.contact.socialProfiles &&
            profile.contact.socialProfiles.length > 0 ? (
              <div>
                <Eyebrow className="text-ink-muted">Connect Online</Eyebrow>
                <ul className="mt-3 flex flex-wrap items-center gap-2.5">
                  {profile.contact.socialProfiles.map((social) => {
                    const IconComponent =
                      SOCIAL_ICONS[
                        social.platform as keyof typeof SOCIAL_ICONS
                      ] ?? GlobeIcon;

                    return (
                      <li key={social.platform}>
                        <Link
                          aria-label={`${entity.name} on ${social.label}`}
                          className="flex size-10 items-center justify-center rounded-full bg-neutral-100 text-ink transition-all duration-200 hover:scale-105 hover:bg-accent hover:text-white"
                          href={social.href as Route}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <Icon className="size-4.5" icon={IconComponent} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
