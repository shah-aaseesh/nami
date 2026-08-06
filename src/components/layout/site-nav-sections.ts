import type { HomeCopy, HomeSectionId } from "@/lib/content";
import type { SiteNavItem } from "./site-nav-panel";

const NAV_SECTIONS: readonly { id: HomeSectionId; hash: string }[] = [
  { id: "about", hash: "#about" },
  { id: "levels", hash: "#levels" },
  { id: "affiliations", hash: "#affiliations" },
  { id: "campusLife", hash: "#campus-life" },
  { id: "updates", hash: "#updates" },
  { id: "admission", hash: "#admission" },
];

export function siteNavItems(copy: HomeCopy): SiteNavItem[] {
  return NAV_SECTIONS.map(({ hash, id }) => {
    const section = copy.sections[id];
    return { hash, label: section.navLabel, descriptor: section.heading };
  });
}
