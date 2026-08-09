import { content, isPlaceholder } from "@/lib/content";
import { SiteHeaderShell } from "./site-header-shell";
import type { SiteMetaLink } from "./site-nav-panel";
import { SITE_NAV_ITEMS } from "./site-nav-sections";

function channel(
  value: string | null,
  scheme: "tel:" | "mailto:",
): SiteMetaLink | null {
  if (value === null) return null;
  return {
    label: value,
    href: isPlaceholder(value) ? null : `${scheme}${value.replace(/\s+/g, "")}`,
    external: false,
  };
}

export async function SiteHeader() {
  const institution = await content.getInstitution();
  const items = SITE_NAV_ITEMS;
  const group = institution.entities.institute;

  const dialled = institution.contact.phones.find(
    (phone) => !isPlaceholder(phone),
  );

  const places = institution.campuses.map(
    (campus) => `${campus.locality}, ${campus.city}`,
  );

  const links: SiteMetaLink[] = [
    ...institution.contact.phones.map((phone) => channel(phone, "tel:")),
    channel(institution.contact.email, "mailto:"),
    ...institution.contact.websites.map((site) => ({
      label: site.label,
      href: site.destination === "legacy" ? null : site.href,
      external: site.destination === "external",
    })),
  ].filter((link) => link !== null) as SiteMetaLink[];

  return (
    <SiteHeaderShell
      call={dialled === undefined ? null : channel(dialled, "tel:")}
      items={items}
      places={places}
      links={links}
      siteName={group.name}
    />
  );
}
