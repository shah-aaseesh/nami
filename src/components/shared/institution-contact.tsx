import type { Route } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { Icon } from "@/components/ui/icon";
import type { Campus, EntityRole } from "@/lib/content";
import { content } from "@/lib/content";
import {
  FacebookIcon,
  GlobeIcon,
  InstagramIcon,
  LinkedInIcon,
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

  const socials = (profile.contact.socialProfiles ?? []).slice(0, 4);

  return (
    <section className="gutter-x section-y border-t border-border/40" id={id}>
      <div className="mx-auto max-w-page">
        <SectionHeader
          eyebrow="Get in Touch with NAMI"
          title="Contact & Location"
        />

        <div className="mx-auto max-w-6xl">
          <Reveal
            className="mt-10 grid grid-cols-1 gap-8 sm:mt-12 md:grid-cols-2 md:gap-12 lg:gap-16 items-center"
            y={16}
          >
            {/* Left: Contact Details (vertically centered, text-left) */}
            <div className="flex flex-col justify-center text-left space-y-4 sm:space-y-5">
              <p className="font-body text-base sm:text-lg text-ink leading-relaxed">
                <span className="font-medium text-ink">Address: </span>
                <span className="text-ink-muted">
                  {campus.streetAddress}, {campus.locality}, {campus.city}
                </span>
              </p>

              <p className="font-body text-base sm:text-lg text-ink">
                <span className="font-medium text-ink">Phone: </span>
                <Link
                  className="text-ink-muted transition-colors hover:text-accent"
                  href={
                    `tel:${entityContact.phone.replace(/[^+\d]/g, "")}` as Route
                  }
                >
                  {entityContact.phone}
                </Link>
              </p>

              <p className="font-body text-base sm:text-lg text-ink">
                <span className="font-medium text-ink">Email: </span>
                <Link
                  className="text-ink-muted transition-colors hover:text-accent"
                  href={`mailto:${entityContact.email}` as Route}
                >
                  {entityContact.email}
                </Link>
              </p>

              {socials.length > 0 ? (
                <div className="pt-2 sm:pt-3">
                  <ul className="flex items-center gap-3">
                    {socials.map((social) => {
                      const IconComponent =
                        SOCIAL_ICONS[
                          social.platform as keyof typeof SOCIAL_ICONS
                        ] ?? GlobeIcon;

                      return (
                        <li key={social.platform}>
                          <Link
                            aria-label={`${entity.name} on ${social.label}`}
                            className="flex size-10 sm:size-11 items-center justify-center rounded-full border border-border/70 text-ink-muted transition-colors hover:border-ink hover:bg-ink hover:text-white"
                            href={social.href as Route}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <Icon className="size-5" icon={IconComponent} />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}
            </div>

            {/* Right: Map */}
            <div className="overflow-hidden rounded-xl border border-border/70 bg-neutral-100 shadow-sm">
              <iframe
                className="block aspect-4/3 w-full h-[260px] sm:h-[300px] lg:h-[320px]"
                height={320}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={mapSrc(campus)}
                title={`Map location of ${entity.name} in ${campus.locality}`}
                width={500}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
