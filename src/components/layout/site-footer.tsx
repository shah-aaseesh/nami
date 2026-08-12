import type { Route } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { H6, P } from "@/components/ui/typography";
import type { Campus, ContentLink } from "@/lib/content";
import { content, isPlaceholder } from "@/lib/content";
import { ArrowUpRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { SiteCtaBand } from "./site-cta-band";
import { SiteFooterWordmark } from "./site-footer-wordmark";
import { SITE_NAV_ITEMS } from "./site-nav-sections";

const metaLink = cn(buttonVariants({ size: "sm", variant: "link" }));
const detailLink = cn(buttonVariants({ size: "md", variant: "link" }));
const columnHeading =
  "font-body text-xl font-medium text-ink underline decoration-1 underline-offset-8";
const quietLink =
  "font-body text-base text-ink-muted transition-colors hover:text-accent";

function WebsiteLink({ link }: { link: ContentLink }) {
  if (link.destination === "legacy") {
    return (
      <span className="font-body text-base text-ink-muted">{link.label}</span>
    );
  }

  const isExternal = link.destination === "external";

  return (
    <Link
      className={detailLink}
      href={link.href as Route}
      rel={isExternal ? "noopener noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      {link.label}
      {isExternal ? <Icon icon={ArrowUpRightIcon} /> : null}
    </Link>
  );
}

function ContactValue({ href, value }: { href: string; value: string }) {
  if (isPlaceholder(value)) {
    return <span className="font-body text-base text-ink-muted">{value}</span>;
  }

  return (
    <Link className={detailLink} href={href as Route}>
      {value}
    </Link>
  );
}

function CampusEntry({ campus }: { campus: Campus }) {
  const street =
    campus.streetAddress !== null && !isPlaceholder(campus.streetAddress)
      ? campus.streetAddress
      : null;
  const mapUrl =
    campus.mapUrl !== null && !isPlaceholder(campus.mapUrl)
      ? campus.mapUrl
      : null;

  return (
    <li>
      <H6 as="h4">{campus.locality}</H6>
      <ul className="mt-4 flex flex-col gap-y-1 font-body text-sm text-ink-muted">
        {campus.hosts.map((host) => (
          <li key={host}>{host}</li>
        ))}
      </ul>
      {street === null ? null : (
        <p className="mt-4 font-body text-sm text-ink-muted">
          {mapUrl === null ? (
            street
          ) : (
            <Link
              className={metaLink}
              href={mapUrl as Route}
              rel="noopener noreferrer"
              target="_blank"
            >
              {street}
              <Icon icon={ArrowUpRightIcon} />
            </Link>
          )}
        </p>
      )}
    </li>
  );
}

export async function SiteFooter() {
  const institution = await content.getInstitution();
  const { campuses, contact, entities } = institution;
  const group = entities.institute;
  const lineage = `Three institutions under the ${group.shortName} name — ${entities.school.name}, ${entities.college.name} and ${group.name}.`;

  const navItems = SITE_NAV_ITEMS;
  const cities = [...new Set(campuses.map((campus) => campus.city))].join(", ");

  const email =
    contact.email !== null && !isPlaceholder(contact.email)
      ? contact.email
      : null;

  const hasContact =
    contact.phones.length > 0 ||
    contact.email !== null ||
    contact.websites.length > 0;

  return (
    <footer>
      {email === null ? null : (
        <SiteCtaBand
          email={email}
          heading={`Write to ${group.shortName}.`}
          standfirst={cities === "" ? group.name : `${group.name} · ${cities}`}
        />
      )}

      <div className="field-ink overflow-hidden gutter-x">
        <div className="mx-auto max-w-page">
          <Reveal
            className="grid gap-y-14 py-16 md:grid-cols-2 md:gap-x-8 xl:grid-cols-12 xl:py-25"
            stagger={0.08}
          >
            <div className="xl:col-span-4" data-reveal-item="">
              <SiteFooterWordmark name={group.name} />
              <P className="mt-8 max-w-xs">{lineage}</P>
            </div>

            <nav
              aria-labelledby="site-footer-explore"
              className="xl:col-span-2"
              data-reveal-item=""
            >
              <h3 className={columnHeading} id="site-footer-explore">
                Explore
              </h3>
              <ul className="mt-8 flex flex-col gap-y-2.5">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link className={quietLink} href={item.href as Route}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {hasContact ? (
              <div className="xl:col-span-2" data-reveal-item="">
                <h3 className={columnHeading}>Contact</h3>
                <ul className="mt-8 flex flex-col items-start gap-y-2.5">
                  {contact.phones.map((phone) => (
                    <li key={phone}>
                      <ContactValue
                        href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                        value={phone}
                      />
                    </li>
                  ))}
                  {contact.email === null ? null : (
                    <li>
                      <ContactValue
                        href={`mailto:${contact.email}`}
                        value={contact.email}
                      />
                    </li>
                  )}
                  {contact.websites.map((site) => (
                    <li key={site.href}>
                      <WebsiteLink link={site} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {campuses.length === 0 ? null : (
              <div className="xl:col-span-4" data-reveal-item="">
                <h3 className={columnHeading}>Campuses</h3>
                <ul className="mt-8 grid gap-y-6 xl:grid-cols-2 xl:gap-x-8">
                  {campuses.map((campus) => (
                    <CampusEntry campus={campus} key={campus.id} />
                  ))}
                </ul>
              </div>
            )}
          </Reveal>

          <div className="flex flex-col gap-y-2 border-t py-4 font-body text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© {group.name}</p>
            <p>{institution.motto}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
