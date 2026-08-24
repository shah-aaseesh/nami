import type { Route } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/typography";
import { content } from "@/lib/content";
import { institutionPath } from "@/lib/content/institutions";
import { MailIcon, PhoneIcon } from "@/lib/icons";
import { SiteCtaBand } from "./site-cta-band";
import { SiteFooterWordmark } from "./site-footer-wordmark";

const FOOTER_NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Admissions", href: "/admissions" },
  { label: "Faculty & Leadership", href: "/faculty" },
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
        standfirst={group.name}
      />

      <footer className="field-brand border-t border-primary-800/80">
        <div className="gutter-x py-10 sm:py-12 lg:py-14">
          <Reveal
            className="mx-auto grid max-w-page grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-10 xl:gap-x-12"
            stagger={0.06}
            y={16}
          >
            {/* Column 1: Brand & Institution Overview */}
            <div className="flex flex-col lg:col-span-4">
              <div>
                <Link
                  className="inline-block transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100 focus-visible:ring-offset-2"
                  href="/"
                  aria-label="NAMI Home"
                >
                  <SiteFooterWordmark name={group.name} />
                </Link>

                <p className="mt-4 font-body text-xs font-normal leading-relaxed text-white/90 text-pretty">
                  Naaya Aayam Multi-Disciplinary Institute (NAMI) is an
                  educational institution with the aim of contributing
                  meaningfully to Nepal&apos;s social and economic development
                  through the delivery of high-quality education.
                </p>
              </div>
            </div>

            {/* Column 2: Quick Links */}
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
                      className="inline-block text-white/85 transition-colors hover:text-white hover:underline underline-offset-4"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Institutional Direct Enquiries (2 in top row, 1 full-width below) */}
            <div className="lg:col-span-6">
              <Eyebrow
                as="h2"
                className="text-xs font-semibold uppercase tracking-widest text-white"
              >
                Institutions & Contacts
              </Eyebrow>

              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Row 1, Col 1: School */}
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
                </div>

                {/* Row 1, Col 2: College (A-Levels) */}
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
                </div>

                {/* Row 2: Institute (Higher Ed) - Full Width */}
                <div className="border-t border-white/15 pt-4 sm:col-span-2">
                  <Link
                    href={institutionPath("bachelors")}
                    className="group block"
                  >
                    <span className="block font-body text-sm font-semibold text-white transition-colors group-hover:text-white group-hover:underline underline-offset-4">
                      {entities.institute.name}
                    </span>
                    <span className="mt-0.5 block font-body text-xs text-white/75">
                      Undergraduate & Postgraduate Programmes
                    </span>
                  </Link>

                  <div className="mt-3 flex flex-col gap-2 font-body text-xs sm:flex-row sm:items-center sm:gap-6">
                    <Link
                      href={
                        `tel:${contact.byEntity.institute.phone.replace(/[^+\d]/g, "")}` as Route
                      }
                      className="flex items-center gap-2 text-white/90 transition-colors hover:text-white"
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
                      className="flex items-center gap-2 text-white/90 transition-colors hover:text-white"
                    >
                      <Icon
                        icon={MailIcon}
                        className="size-3.5 shrink-0 text-white"
                      />
                      <span>{contact.byEntity.institute.email}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Dark Sub-footer Strip (field-ink) */}
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
