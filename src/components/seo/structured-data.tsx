import type {
  Affiliation,
  Campus,
  InstitutionProfile,
  NamedEntity,
} from "@/lib/content";
import { content } from "@/lib/content";
import { absoluteUrl, siteUrl } from "@/lib/seo";
import { JsonLd, type JsonLdNode } from "./json-ld";

const ADDRESS_COUNTRY = "NP";

export type Crumb = {
  readonly name: string;
  readonly path: string;
};

function isPlainText(value: string): boolean {
  return !/[<>]/.test(value);
}

function publishable(value: string | null | undefined): string | undefined {
  const text = value?.trim();
  if (!text || !isPlainText(text)) {
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
    addressLocality: publishable(campus.locality),
    addressRegion: publishable(campus.city),
    addressCountry: ADDRESS_COUNTRY,
  };
}

function credentialNode(affiliation: Affiliation): JsonLdNode | null {
  const name = publishable(affiliation.scope);
  if (name === undefined) return null;

  return {
    "@type": "EducationalOccupationalCredential",
    name,
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

  const credentials = affiliations
    .map(credentialNode)
    .filter((node) => node !== null);

  const url = absoluteUrl("/");
  const { college, institute, school } = profile.entities;

  return {
    ...entityNode(institute),
    "@id": `${url}#organization`,
    url,
    slogan: publishable(profile.motto),
    subOrganization: [school, college].map((member) => ({
      ...entityNode(member),
      "@id": `${url}#${member.role}`,
    })),
    address: profile.campuses.map(postalAddress),
    telephone: profile.contact.phones
      .map(publishable)
      .find((phone) => phone !== undefined),
    email: publishable(profile.contact.email),
    hasCredential: credentials.length > 0 ? credentials : undefined,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
  };
}

export function BreadcrumbJsonLd({
  trail,
}: {
  readonly trail: readonly Crumb[];
}) {
  if (trail.length < 2) return null;

  return (
    <JsonLd
      graph={[
        {
          "@type": "BreadcrumbList",
          itemListElement: trail.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.name,
            item: absoluteUrl(crumb.path),
          })),
        },
      ]}
    />
  );
}

export async function StructuredData() {
  const [profile, affiliations] = await Promise.all([
    content.getInstitution(),
    content.getAffiliations(),
  ]);

  return <JsonLd graph={[organizationNode(profile, affiliations)]} />;
}
