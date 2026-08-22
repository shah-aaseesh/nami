import { entryOf } from "../identifiers";
import type { Partner } from "../types";
import { partnerLogoStandIn } from "./placeholders";

const industryPartnerNames: readonly [string, string][] = [
  ["sanima-bank", "Sanima Bank"],
  ["sunrise-bank", "Sunrise Bank"],
  ["cloud-factory", "Cloud Factory"],
  ["nyef-lalitpur", "Nepalese Young Entrepreneurs' Forum (NYEF) Lalitpur"],
  ["machan-country-villa", "Machan Country Villa"],
  ["mayahold", "MayaHold"],
  ["adex-international", "Adex International"],
  ["genese-solutions", "Genese Solutions"],
  ["pathao-nepal", "Pathao Nepal"],
  ["ap1-television", "AP1 Television"],
  ["annapurna-media-network", "Annapurna Media Network (APN)"],
  ["sabco", "Southern Asia Business House (SABCO)"],
  ["intern-nepal-recruit-nepal", "Intern Nepal Recruit Nepal"],
  ["bajra-technologies", "Bajra Technologies"],
  ["clock-business-technology", "Clock Business Technology"],
  ["buddha-tech", "Buddha Tech Pvt. Ltd."],
];

export const partners: readonly Partner[] = [
  {
    ...entryOf("aws-academy"),
    name: "AWS Academy",
    kind: "technology",
    blurb:
      "As an AWS Academy College, NAMI teaches the Amazon Web Services cloud computing curriculum and prepares students for globally recognised certifications.",
    href: null,
    logo: partnerLogoStandIn,
  },
  {
    ...entryOf("startup-discovery-asia"),
    name: "Startup Discovery Asia (SDA)",
    kind: "ecosystem",
    blurb:
      "South Asian startup ecosystem enabler, partner behind the Naaya Aayam Avinaya Prerana Kendra incubation centre.",
    href: null,
    logo: partnerLogoStandIn,
  },
  ...industryPartnerNames.map<Partner>(([partnerSlug, name]) => ({
    ...entryOf(partnerSlug),
    name,
    kind: "industry",
    blurb: null,
    href: null,
    logo: partnerLogoStandIn,
  })),
];
