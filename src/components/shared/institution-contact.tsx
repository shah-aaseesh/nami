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
  LocationIcon,
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
    <section className="field-ink gutter-x section-y" id={id}>
      <div className="mx-auto max-w-page">
        <Reveal stagger={0.08}>
          <RevealItem className="flex items-center gap-5">
            <Eyebrow className="text-primary-300">Contact & Location</Eyebrow>
            <span className="h-px flex-1 bg-neutral-800" />
          </RevealItem>

          <div className="mt-6 sm:max-w-2xl lg:mt-8">
            <SplitText as="h2">{`Get in Touch with ${entity.name}`}</SplitText>
          </div>
        </Reveal>

        <Reveal
          className="mt-10 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-12"
          stagger={0.1}
          y={20}
        >
          <div className="flex flex-col justify-between space-y-8 lg:col-span-5">
            <div className="space-y-6">
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 backdrop-blur-xs">
                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-950/80 text-primary-400 border border-primary-800/50">
                    <Icon className="size-5" icon={LocationIcon} />
                  </div>
                  <div>
                    <Eyebrow className="text-neutral-400">
                      Campus Location
                    </Eyebrow>
                    <H3 className="mt-1 text-lg font-semibold text-white">
                      {campus.locality}, {campus.city}
                    </H3>
                    <P className="mt-1 text-xs text-neutral-400">
                      {campus.streetAddress}
                    </P>
                    <Link
                      className="mt-3 inline-block font-body text-xs font-semibold text-primary-400 transition-colors hover:text-primary-300 hover:underline underline-offset-4"
                      href={campus.mapUrl as Route}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Open in Google Maps →
                    </Link>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 backdrop-blur-xs">
                <Eyebrow className="text-neutral-400">Direct Inquiries</Eyebrow>
                <div className="mt-4 space-y-3 font-body text-sm">
                  <Link
                    className="flex items-center gap-3 text-neutral-200 transition-colors hover:text-white"
                    href={
                      `tel:${entityContact.phone.replace(/[^+\d]/g, "")}` as Route
                    }
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-neutral-800 text-neutral-300">
                      <Icon className="size-4" icon={PhoneIcon} />
                    </div>
                    <span className="font-medium">{entityContact.phone}</span>
                  </Link>

                  <Link
                    className="flex items-center gap-3 text-neutral-200 transition-colors hover:text-white"
                    href={`mailto:${entityContact.email}` as Route}
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-neutral-800 text-neutral-300">
                      <Icon className="size-4" icon={MailIcon} />
                    </div>
                    <span className="font-medium">{entityContact.email}</span>
                  </Link>
                </div>
              </div>
            </div>

            {profile.contact.socialProfiles &&
            profile.contact.socialProfiles.length > 0 ? (
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 backdrop-blur-xs">
                <Eyebrow className="text-neutral-400">Connect Online</Eyebrow>
                <div className="mt-4 flex flex-wrap items-center gap-2.5">
                  {profile.contact.socialProfiles.map((social) => {
                    const IconComponent =
                      SOCIAL_ICONS[
                        social.platform as keyof typeof SOCIAL_ICONS
                      ] ?? GlobeIcon;

                    return (
                      <Link
                        aria-label={`${entity.name} on ${social.label}`}
                        className="flex size-9 items-center justify-center rounded-full border border-neutral-700/80 bg-neutral-800 text-neutral-300 transition-all duration-200 hover:scale-105 hover:border-primary-500 hover:bg-primary-600 hover:text-white"
                        href={social.href as Route}
                        key={social.platform}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Icon className="size-4" icon={IconComponent} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>

          <div className="lg:col-span-7">
            <div className="h-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-xl">
              <iframe
                className="block h-[380px] w-full lg:h-full min-h-[380px]"
                height={600}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={mapSrc(campus)}
                title={`Map location of ${entity.name} in ${campus.locality}`}
                width={800}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
