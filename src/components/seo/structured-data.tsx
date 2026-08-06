import type {
  Affiliation,
  Campus,
  InstitutionProfile,
  NamedEntity,
} from "@/lib/content";
import { content, isPlaceholder } from "@/lib/content";
import { absoluteUrl, siteUrl } from "@/lib/seo";
import { JsonLd, type JsonLdNode } from "./json-ld";

const ADDRESS_COUNTRY = "NP";
const HOME_CRUMB = "Home";

function isPlainText(value: string): boolean {
  return !/[<>]/.test(value);
}

function publishable(value: string | null | undefined): string | undefined {
  const text = value?.trim();
  if (!text || isPlaceholder(value) || !isPlainText(text)) {
    return undefined;
  }
  return text;
}

function entityNode(entity: NamedEntity): JsonLdNode {
  const name = publishable(entity.name);
  const shortName = publishable(entity.shortName);
  return {
    "@type": "EducationalOrganization",
    name,
    alternateName: shortName === name ? undefined : shortName,
    foundingDate:
      entity.establishedYear === null
        ? undefined
        : String(entity.establishedYear),
  };
}

function postalAddress(campus: Campus): JsonLdNode {
  return {
    "@type": "PostalAddress",
    streetAddress: publishable(campus.streetAddress),
    addressLocality: publishable(campus.locality),
    addressRegion: publishable(campus.city),
    addressCountry: ADDRESS_COUNTRY,
  };
}

function credentialNode(affiliation: Affiliation): JsonLdNode {
  return {
    "@type": "EducationalOccupationalCredential",
    name: publishable(affiliation.scope),
    recognizedBy: {
      "@type": "Organization",
      name: publishable(affiliation.body),
    },
  };
}

function organizationNode(
  profile: InstitutionProfile,
  affiliations: readonly Affiliation[],
): JsonLdNode {
  const sameAs = profile.contact.websites
    .filter(
      (site) =>
        site.destination === "legacy" && !site.href.startsWith(siteUrl.origin),
    )
    .map((site) => site.href);

  const url = absoluteUrl("/");

  return {
    ...entityNode(profile.entities.college),
    "@id": `${url}#organization`,
    url,
    slogan: publishable(profile.motto),
    parentOrganization: entityNode(profile.entities.institute),
    address: profile.campuses.map(postalAddress),
    telephone: profile.contact.phones
      .map(publishable)
      .find((phone) => phone !== undefined),
    email: publishable(profile.contact.email),
    hasCredential: affiliations.map(credentialNode),
    sameAs: sameAs.length > 0 ? sameAs : undefined,
  };
}

function breadcrumbNode(): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: HOME_CRUMB,
        item: absoluteUrl("/"),
      },
    ],
  };
}

export async function StructuredData() {
  const [profile, affiliations] = await Promise.all([
    content.getInstitution(),
    content.getAffiliations(),
  ]);

  return (
    <JsonLd
      graph={[organizationNode(profile, affiliations), breadcrumbNode()]}
    />
  );
}
