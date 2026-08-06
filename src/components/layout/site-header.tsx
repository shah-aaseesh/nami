import type { HomeSectionId } from "@/lib/content";
import { content, isPlaceholder } from "@/lib/content";
import { SiteHeaderShell } from "./site-header-shell";
import type { SiteMetaLink, SiteNavItem } from "./site-nav-panel";

const NAV_SECTIONS: readonly { id: HomeSectionId; hash: string }[] = [
  { id: "about", hash: "#about" },
  { id: "levels", hash: "#levels" },
  { id: "affiliations", hash: "#affiliations" },
  { id: "campusLife", hash: "#campus-life" },
  { id: "updates", hash: "#updates" },
  { id: "admission", hash: "#admission" },
];

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
  const [copy, institution] = await Promise.all([
    content.getHomeCopy(),
    content.getInstitution(),
  ]);

  const items: SiteNavItem[] = NAV_SECTIONS.map(({ hash, id }) => {
    const section = copy.sections[id];
    return { hash, label: section.navLabel, descriptor: section.heading };
  });

  const { shortName } = institution.entities.college;
  const spaceAt = shortName.indexOf(" ");

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
  ].filter((link) => link !== null);

  return (
    <SiteHeaderShell
      items={items}
      links={links}
      places={places}
      wordmark={{
        lead: spaceAt === -1 ? shortName : shortName.slice(0, spaceAt),
        tail: spaceAt === -1 ? null : shortName.slice(spaceAt + 1),
      }}
    />
  );
}
