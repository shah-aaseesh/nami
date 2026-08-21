import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, P } from "@/components/ui/typography";
import type { EntityRole, SocialPlatform } from "@/lib/content";
import { content, isPlaceholder, paragraphsOf } from "@/lib/content";
import type { IconSvgElement } from "@/lib/icons";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TikTokIcon,
  TwitterIcon,
  YouTubeIcon,
} from "@/lib/icons";
import { INSTITUTION_ROLES } from "@/lib/institution-filter";
import { SiteCtaBand } from "./site-cta-band";
import { SITE_FOOTER_NAV_ITEMS } from "./site-nav-sections";

const SOCIAL_GLYPHS: Record<SocialPlatform, IconSvgElement> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  tiktok: TikTokIcon,
  twitter: TwitterIcon,
  youtube: YouTubeIcon,
};

const ENTITY_HREFS: Record<EntityRole, Route> = {
  school: "/institutions/school",
  college: "/institutions/college",
  institute: "/institutions/bachelors",
};

function stated(value: string | null | undefined): string | null {
  return value === undefined || value === null || isPlaceholder(value)
    ? null
    : value;
}

type FooterContactProps = {
  name: string;
  href: Route;
  phone: string | null;
  email: string | null;
};

function FooterContact({ email, href, name, phone }: FooterContactProps) {
  return (
    <li className="border-l border-border-strong/70 pl-4">
      <Link
        className="font-body text-base font-medium text-pretty underline-offset-4 transition-colors hover:text-accent hover:underline"
        href={href}
      >
        {name}
      </Link>

      {phone === null && email === null ? null : (
        <div className="mt-1 font-body text-sm">
          {phone === null ? null : (
            <Link
              className="block transition-colors hover:text-accent"
              href={`tel:${phone.replace(/[^+\d]/g, "")}` as Route}
            >
              {phone}
            </Link>
          )}
          {email === null ? null : (
            <Link
              className="block break-words transition-colors hover:text-accent"
              href={`mailto:${email}` as Route}
            >
              {email}
            </Link>
          )}
        </div>
      )}
    </li>
  );
}

export async function SiteFooter() {
  const institution = await content.getInstitution();
  const { campuses, contact, entities, overview } = institution;
  const group = entities.institute;

  const summary = stated(paragraphsOf(overview)[0]);
  const groupEmail = stated(contact.email);

  return (
    <>
      {groupEmail === null ? null : (
        <SiteCtaBand
          email={groupEmail}
          heading="Subscribe to our Newsletter"
          standfirst={group.name}
        />
      )}

      <footer className="field-brand">
        <div className="gutter-x section-y">
          <Reveal
            className="mx-auto grid max-w-page gap-y-10 md:grid-cols-12 md:gap-x-8 lg:gap-x-10"
            stagger={0.06}
            y={16}
          >
            <div className="md:col-span-12 lg:col-span-6">
              <Link className="inline-block" href="/">
                <Image
                  alt={group.shortName}
                  className="h-16 w-auto md:h-20"
                  height={1000}
                  sizes="(min-width: 768px) 80px, 64px"
                  src="/logo/nami-white.svg"
                  width={1000}
                />
              </Link>

              {summary === null ? null : (
                <P className="mt-5 max-w-xl text-sm">{summary}</P>
              )}

              <ul className="mt-6 grid gap-y-3">
                {campuses.map((campus) => {
                  const street = stated(campus.streetAddress);
                  return (
                    <li key={campus.id}>
                      <p className="font-body text-base font-medium">
                        {campus.locality}, {campus.city}
                      </p>
                      {street === null ? null : (
                        <p className="font-body text-sm text-pretty text-ink-muted">
                          {street}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <nav aria-label="Footer" className="md:col-span-5 lg:col-span-3">
              <Eyebrow as="h2">Quick Links</Eyebrow>
              <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
                {SITE_FOOTER_NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      className="inline-block py-1 font-body text-base whitespace-nowrap underline-offset-4 transition-colors hover:text-accent hover:underline"
                      href={item.href as Route}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="md:col-span-7 lg:col-span-3">
              <Eyebrow as="h2">Contact</Eyebrow>
              <ul className="mt-4 grid gap-y-5">
                {INSTITUTION_ROLES.map((role) => (
                  <FooterContact
                    email={stated(contact.byEntity[role].email)}
                    href={ENTITY_HREFS[role]}
                    key={role}
                    name={entities[role].name}
                    phone={stated(contact.byEntity[role].phone)}
                  />
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="field-ink gutter-x section-y-compact">
          <div className="mx-auto flex max-w-page flex-col gap-y-4 md:flex-row md:items-center md:justify-between">
            <p className="font-body text-sm text-ink-muted">
              © {group.name}
              {group.establishedYear === null
                ? null
                : ` · Established ${group.establishedYear}`}
            </p>

            <ul className="flex flex-wrap items-center gap-2">
              {contact.socialProfiles.map((profile) => (
                <li key={profile.href}>
                  <Link
                    aria-label={profile.label}
                    className="flex size-9 items-center justify-center rounded-full border border-border-strong/50 transition-colors hover:border-primary-700 hover:bg-primary-700 hover:text-primary-100"
                    href={profile.href as Route}
                    rel={
                      profile.destination === "external"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    target={
                      profile.destination === "external" ? "_blank" : undefined
                    }
                  >
                    <Icon
                      className="size-4"
                      icon={SOCIAL_GLYPHS[profile.platform]}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
