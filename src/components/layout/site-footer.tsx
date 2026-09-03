import type { Route } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/typography";
import { content } from "@/lib/content";
import { institutionPath } from "@/lib/content/institutions";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  TikTokIcon,
  YouTubeIcon,
} from "@/lib/icons";
import { SiteCtaBand } from "./site-cta-band";
import { SiteFooterWordmark } from "./site-footer-wordmark";

const FOOTER_NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Admissions", href: "/admissions" },
  { label: "Student Life", href: "/student-life" },
  { label: "Photo Gallery", href: "/gallery" },
  { label: "Careers", href: "/careers" },
  { label: "Notices & Events", href: "/notices" },
] as const;

export async function SiteFooter() {
  const institution = await content.getInstitution();
  const { contact, entities } = institution;
  const group = entities.institute;

  return (
    <>
      <SiteCtaBand
        heading="Subscribe to our Newsletter"
        onFooterSeam
        standfirst={group.name}
      />

      <footer className="field-brand border-t border-primary-800/80">
        <div className="gutter-x py-10 sm:py-12 lg:py-14">
          <Reveal
            className="mx-auto grid max-w-page grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-10 xl:gap-x-12"
            stagger={0.06}
            y={16}
          >
            <div className="flex flex-col lg:col-span-4">
              <div>
                <Link
                  className="inline-block transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100 focus-visible:ring-offset-2"
                  href="/"
                  aria-label="NAMI Home"
                >
                  <SiteFooterWordmark name={group.name} />
                </Link>

                <p className="mt-4 font-body text-xs font-normal leading-relaxed text-white/90 text-justify">
                  Naaya Aayam Multi-Disciplinary Institute (NAMI) is an
                  educational entity established in 2012, committed to
                  advancing human capital through world-class education, global
                  standards and holistic development while empowering
                  individuals with the knowledge, skills and leadership
                  capabilities to create meaningful impact locally and globally.
                </p>

                <div className="mt-5 flex items-center gap-2.5">
                  {contact.socialProfiles.map((social) => {
                    const iconMap: Record<string, typeof FacebookIcon> = {
                      facebook: FacebookIcon,
                      instagram: InstagramIcon,
                      linkedin: LinkedInIcon,
                      youtube: YouTubeIcon,
                      tiktok: TikTokIcon,
                    };
                    const SocialIcon = iconMap[social.platform];
                    if (!SocialIcon) return null;
                    return (
                      <Link
                        key={social.platform}
                        href={social.href as Route}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white hover:text-primary-700 hover:scale-110"
                        aria-label={social.label}
                      >
                        <Icon icon={SocialIcon} className="size-4" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <Eyebrow
                as="h2"
                className="text-xs font-semibold uppercase tracking-widest text-white"
              >
                Quick Links
              </Eyebrow>
              <ul className="mt-4 space-y-2.5 font-body text-xs">
                {FOOTER_NAV_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href as Route}
                      className="inline-block py-1 text-white/85 transition-colors hover:text-white hover:underline underline-offset-4"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6">
              <Eyebrow
                as="h2"
                className="text-xs font-semibold uppercase tracking-widest text-white text-center"
              >
                Institutions & Contacts
              </Eyebrow>

              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="border-t border-white/15 pt-4">
                  <Link
                    href={institutionPath("school")}
                    className="group block"
                  >
                    <span className="block font-body text-sm font-semibold text-white transition-colors group-hover:text-white group-hover:underline underline-offset-4">
                      {entities.school.name}
                    </span>
                    <span className="mt-0.5 block font-body text-xs text-white/75">
                      School & +2 NEB
                    </span>
                  </Link>

                  <div className="mt-3 space-y-1.5 font-body text-xs">
                    <Link
                      href={
                        `tel:${contact.byEntity.school.phone.replace(/[^+\d]/g, "")}` as Route
                      }
                      className="flex items-center gap-2 text-white/90 transition-colors hover:text-white"
                    >
                      <Icon
                        icon={PhoneIcon}
                        className="size-3.5 shrink-0 text-white"
                      />
                      <span>{contact.byEntity.school.phone}</span>
                    </Link>
                    <Link
                      href={`mailto:${contact.byEntity.school.email}` as Route}
                      className="flex items-center gap-2 text-white/90 transition-colors hover:text-white"
                    >
                      <Icon
                        icon={MailIcon}
                        className="size-3.5 shrink-0 text-white"
                      />
                      <span>{contact.byEntity.school.email}</span>
                    </Link>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <Link
                      href={"https://www.facebook.com/namischoolnepal/" as Route}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-7 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white hover:text-primary-700 hover:scale-110"
                      aria-label="NAMI School Facebook"
                    >
                      <Icon icon={FacebookIcon} className="size-3.5" />
                    </Link>
                    <Link
                      href={"https://www.instagram.com/nami.school/" as Route}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-7 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white hover:text-primary-700 hover:scale-110"
                      aria-label="NAMI School Instagram"
                    >
                      <Icon icon={InstagramIcon} className="size-3.5" />
                    </Link>
                    <Link
                      href={"https://www.youtube.com/user/naminepal" as Route}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-7 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white hover:text-primary-700 hover:scale-110"
                      aria-label="NAMI School YouTube"
                    >
                      <Icon icon={YouTubeIcon} className="size-3.5" />
                    </Link>
                    <Link
                      href={"https://www.tiktok.com/@namicollege" as Route}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-7 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white hover:text-primary-700 hover:scale-110"
                      aria-label="NAMI School TikTok"
                    >
                      <Icon icon={TikTokIcon} className="size-3.5" />
                    </Link>
                  </div>
                </div>

                <div className="border-t border-white/15 pt-4">
                  <Link
                    href={institutionPath("college")}
                    className="group block"
                  >
                    <span className="block font-body text-sm font-semibold text-white transition-colors group-hover:text-white group-hover:underline underline-offset-4">
                      {entities.college.name}
                    </span>
                    <span className="mt-0.5 block font-body text-xs text-white/75">
                      Cambridge Assessment GCE A-Levels
                    </span>
                  </Link>

                  <div className="mt-3 space-y-1.5 font-body text-xs">
                    <Link
                      href={
                        `tel:${contact.byEntity.college.phone.replace(/[^+\d]/g, "")}` as Route
                      }
                      className="flex items-center gap-2 text-white/90 transition-colors hover:text-white"
                    >
                      <Icon
                        icon={PhoneIcon}
                        className="size-3.5 shrink-0 text-white"
                      />
                      <span>{contact.byEntity.college.phone}</span>
                    </Link>
                    <Link
                      href={`mailto:${contact.byEntity.college.email}` as Route}
                      className="flex items-center gap-2 text-white/90 transition-colors hover:text-white"
                    >
                      <Icon
                        icon={MailIcon}
                        className="size-3.5 shrink-0 text-white"
                      />
                      <span>{contact.byEntity.college.email}</span>
                    </Link>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <Link
                      href={"https://www.facebook.com/NamiCollege/" as Route}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-7 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white hover:text-primary-700 hover:scale-110"
                      aria-label="NAMI College Facebook"
                    >
                      <Icon icon={FacebookIcon} className="size-3.5" />
                    </Link>
                    <Link
                      href={"https://www.instagram.com/namicollege/" as Route}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-7 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white hover:text-primary-700 hover:scale-110"
                      aria-label="NAMI College Instagram"
                    >
                      <Icon icon={InstagramIcon} className="size-3.5" />
                    </Link>
                    <Link
                      href={"https://www.linkedin.com/company/nami-college" as Route}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-7 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white hover:text-primary-700 hover:scale-110"
                      aria-label="NAMI College LinkedIn"
                    >
                      <Icon icon={LinkedInIcon} className="size-3.5" />
                    </Link>
                    <Link
                      href={"https://www.tiktok.com/@namicollege" as Route}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-7 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white hover:text-primary-700 hover:scale-110"
                      aria-label="NAMI College TikTok"
                    >
                      <Icon icon={TikTokIcon} className="size-3.5" />
                    </Link>
                  </div>
                </div>

                <div className="border-t border-white/15 pt-4 sm:col-span-2 text-center flex flex-col items-center">
                  <Link
                    href={institutionPath("bachelors")}
                    className="group inline-block"
                  >
                    <span className="block font-body text-sm font-semibold text-white transition-colors group-hover:text-white group-hover:underline underline-offset-4">
                      {entities.institute.name}
                    </span>
                    <span className="mt-0.5 block font-body text-xs text-white/75">
                      Undergraduate & Postgraduate Programmes
                    </span>
                  </Link>

                  <div className="mt-3 flex flex-col items-center justify-center gap-2 font-body text-xs sm:flex-row sm:gap-6">
                    <Link
                      href={
                        `tel:${contact.byEntity.institute.phone.replace(/[^+\d]/g, "")}` as Route
                      }
                      className="flex items-center justify-center gap-2 text-white/90 transition-colors hover:text-white"
                    >
                      <Icon
                        icon={PhoneIcon}
                        className="size-3.5 shrink-0 text-white"
                      />
                      <span>{contact.byEntity.institute.phone}</span>
                    </Link>
                    <Link
                      href={
                        `mailto:${contact.byEntity.institute.email}` as Route
                      }
                      className="flex items-center justify-center gap-2 text-white/90 transition-colors hover:text-white"
                    >
                      <Icon
                        icon={MailIcon}
                        className="size-3.5 shrink-0 text-white"
                      />
                      <span>{contact.byEntity.institute.email}</span>
                    </Link>
                  </div>

                  <div className="mt-3 flex items-center justify-center gap-2">
                    <Link
                      href={"https://www.facebook.com/NamiCollege/" as Route}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-7 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white hover:text-primary-700 hover:scale-110"
                      aria-label="NAMI Institute Facebook"
                    >
                      <Icon icon={FacebookIcon} className="size-3.5" />
                    </Link>
                    <Link
                      href={"https://www.instagram.com/namicollege/" as Route}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-7 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white hover:text-primary-700 hover:scale-110"
                      aria-label="NAMI Institute Instagram"
                    >
                      <Icon icon={InstagramIcon} className="size-3.5" />
                    </Link>
                    <Link
                      href={"https://www.linkedin.com/company/nami-college" as Route}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-7 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white hover:text-primary-700 hover:scale-110"
                      aria-label="NAMI Institute LinkedIn"
                    >
                      <Icon icon={LinkedInIcon} className="size-3.5" />
                    </Link>
                    <Link
                      href={"https://www.youtube.com/user/naminepal" as Route}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-7 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white hover:text-primary-700 hover:scale-110"
                      aria-label="NAMI Institute YouTube"
                    >
                      <Icon icon={YouTubeIcon} className="size-3.5" />
                    </Link>
                    <Link
                      href={"https://www.tiktok.com/@namicollege" as Route}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-7 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white hover:text-primary-700 hover:scale-110"
                      aria-label="NAMI Institute TikTok"
                    >
                      <Icon icon={TikTokIcon} className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="field-ink gutter-x py-4 sm:py-5 border-t border-neutral-800">
          <div className="mx-auto max-w-page text-center">
            <p className="font-body text-xs text-neutral-300">
              © {new Date().getFullYear()} {group.name}
              {group.establishedYear
                ? ` · Estd. ${group.establishedYear}`
                : null}
              . All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
