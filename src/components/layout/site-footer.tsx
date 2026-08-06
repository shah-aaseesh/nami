import type { Route } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H5, Standfirst } from "@/components/ui/typography";
import type { Campus, ContentLink } from "@/lib/content";
import { content, isPlaceholder } from "@/lib/content";
import { ArrowUpRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { SiteFooterWordmark } from "./site-footer-wordmark";

const metaLink = cn(buttonVariants({ size: "md", variant: "link" }));
const detailLink = cn(buttonVariants({ size: "lg", variant: "link" }));

function WebsiteLink({ link }: { link: ContentLink }) {
  if (link.destination === "legacy") {
    return <span className="font-body text-sm text-ink">{link.label}</span>;
  }

  const isExternal = link.destination === "external";

  return (
    <Link
      className={metaLink}
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
    return <span className="font-body text-base text-ink">{value}</span>;
  }

  return (
    <Link className={detailLink} href={href as Route}>
      {value}
    </Link>
  );
}

function CampusAddress({ campus }: { campus: Campus }) {
  if (campus.streetAddress === null || isPlaceholder(campus.streetAddress)) {
    return null;
  }

  const mapUrl =
    campus.mapUrl !== null && !isPlaceholder(campus.mapUrl)
      ? campus.mapUrl
      : null;

  return (
    <p className="mt-6 font-body text-sm text-ink-muted">
      {mapUrl === null ? (
        campus.streetAddress
      ) : (
        <Link
          className={metaLink}
          href={mapUrl as Route}
          rel="noopener noreferrer"
          target="_blank"
        >
          {campus.streetAddress}
          <Icon icon={ArrowUpRightIcon} />
        </Link>
      )}
    </p>
  );
}

function CampusEntry({ campus }: { campus: Campus }) {
  return (
    <li
      className="border-t pt-8 lg:grid lg:grid-cols-7 lg:gap-x-8"
      data-reveal-item=""
    >
      <div className="lg:col-span-3">
        <H5 as="h3">{campus.locality}</H5>
        <p className="mt-2 font-body text-sm text-ink-muted">{campus.city}</p>
      </div>

      <div className="mt-6 lg:col-span-4 lg:mt-0">
        <ul className="flex flex-col gap-y-2 font-body text-sm text-ink">
          {campus.hosts.map((host) => (
            <li key={host}>{host}</li>
          ))}
        </ul>
        <CampusAddress campus={campus} />
      </div>
    </li>
  );
}

export async function SiteFooter() {
  const { campuses, contact, entities } = await content.getInstitution();
  const college = entities.college;

  const splitAt = college.name.indexOf(" ");
  const lead =
    splitAt === -1 ? college.name : college.name.slice(0, splitAt + 1);
  const tail = splitAt === -1 ? null : college.name.slice(splitAt + 1);

  const hasContact =
    contact.phones.length > 0 ||
    contact.email !== null ||
    contact.websites.length > 0;

  return (
    <footer className="field-ink overflow-hidden gutter-x section-y">
      <div className="mx-auto max-w-page">
        <Reveal className="flex items-center gap-5 lg:w-7/12">
          <Eyebrow>{entities.institute.name}</Eyebrow>
          <span className="h-px flex-1 bg-border" />
        </Reveal>

        <SiteFooterWordmark className="mt-8 lg:mt-12" lead={lead} tail={tail} />

        <Reveal className="mt-12 lg:mt-14 lg:w-5/12" delay={0.25}>
          <Standfirst>
            One institute, two schools — {entities.school.name} and{" "}
            {college.name}.
          </Standfirst>
        </Reveal>

        {campuses.length === 0 && !hasContact ? null : (
          <Reveal
            className="mt-16 lg:mt-24 lg:grid lg:grid-cols-12 lg:gap-x-8"
            delay={0.4}
            stagger={0.08}
          >
            {campuses.length === 0 ? null : (
              <ul className="flex flex-col gap-y-10 lg:col-span-7">
                {campuses.map((campus) => (
                  <CampusEntry campus={campus} key={campus.id} />
                ))}
              </ul>
            )}

            {hasContact ? (
              <dl
                className="mt-16 flex flex-col gap-y-8 lg:col-span-4 lg:col-start-9 lg:mt-24"
                data-reveal-item=""
              >
                {contact.phones.length === 0 ? null : (
                  <div>
                    <dt className="font-body text-sm text-ink-muted">Phone</dt>
                    <dd className="mt-2">
                      <ul className="flex flex-col items-start gap-y-2">
                        {contact.phones.map((phone) => (
                          <li key={phone}>
                            <ContactValue
                              href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                              value={phone}
                            />
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}

                {contact.email === null ? null : (
                  <div>
                    <dt className="font-body text-sm text-ink-muted">Email</dt>
                    <dd className="mt-2">
                      <ContactValue
                        href={`mailto:${contact.email}`}
                        value={contact.email}
                      />
                    </dd>
                  </div>
                )}

                {contact.websites.length === 0 ? null : (
                  <div>
                    <dt className="font-body text-sm text-ink-muted">Online</dt>
                    <dd className="mt-2">
                      <ul className="flex flex-col items-start gap-y-2">
                        {contact.websites.map((site) => (
                          <li key={site.href}>
                            <WebsiteLink link={site} />
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
              </dl>
            ) : null}
          </Reveal>
        )}

        <Reveal className="mt-16 border-t pt-8 lg:mt-24" delay={0.4}>
          <p className="font-body text-sm text-ink-muted">© {college.name}</p>
        </Reveal>
      </div>
    </footer>
  );
}
