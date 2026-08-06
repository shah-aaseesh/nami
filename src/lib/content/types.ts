import type { ContentEntry, IsoDate, Slug } from "./identifiers";
import type { RichText } from "./rich-text";

export type ContentImage = {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
};

export type LinkDestination = "internal" | "external" | "legacy";

export type ContentLink = {
  readonly label: string;
  readonly href: string;
  readonly destination: LinkDestination;
};

export type CoreValue = ContentEntry & {
  readonly name: string;
  readonly meaning: string;
};

export type Campus = ContentEntry & {
  readonly locality: string;
  readonly city: string;
  readonly hosts: readonly string[];
  readonly streetAddress: string | null;
  readonly mapUrl: string | null;
};

export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "linkedin"
  | "twitter"
  | "youtube";

export type SocialProfile = ContentLink & {
  readonly platform: SocialPlatform;
};

export type ContactChannel = {
  readonly phones: readonly string[];
  readonly email: string | null;
  readonly websites: readonly ContentLink[];
  readonly socialProfiles: readonly SocialProfile[];
};

export type EntityRole = "institute" | "college" | "school";

export type NamedEntity = {
  readonly role: EntityRole;
  readonly name: string;
  readonly shortName: string;
  readonly establishedYear: number | null;
};

export type InstitutionProfile = {
  readonly entities: Readonly<Record<EntityRole, NamedEntity>>;
  readonly motto: string;
  readonly overview: RichText;
  readonly mission: RichText;
  readonly vision: RichText;
  readonly emblemStory: RichText;
  readonly values: readonly CoreValue[];
  readonly campuses: readonly Campus[];
  readonly contact: ContactChannel;
};

export type StatGroup = "enrolment" | "graduates" | "alumni";

export type StatPlacement = "hero" | "stats";

export type Stat = ContentEntry & {
  readonly placement: StatPlacement;
  readonly group: StatGroup;
  readonly value: number;
  readonly suffix: string | null;
  readonly label: string;
  readonly detail: string | null;
};

export type AcademicLevel = ContentEntry & {
  readonly title: string;
  readonly stage: string;
  readonly summary: RichText;
  readonly highlights: readonly string[];
  readonly campusSlug: Slug;
  readonly image: ContentImage | null;
};

export type Programme = ContentEntry & {
  readonly title: string;
  readonly shortTitle: string;
  readonly qualification: string;
  readonly awardingBody: string;
  readonly levelSlug: Slug;
  readonly startingFrom: string | null;
};

export type Affiliation = ContentEntry & {
  readonly body: string;
  readonly scope: string;
  readonly sinceYear: number;
  readonly levelSlug: Slug;
  readonly campusSlug: Slug;
  readonly note: string | null;
  readonly logo: ContentImage | null;
};

export type PartnerKind = "industry" | "technology" | "ecosystem";

export type Partner = ContentEntry & {
  readonly name: string;
  readonly kind: PartnerKind;
  readonly blurb: string | null;
  readonly href: string | null;
  readonly logo: ContentImage | null;
};

export type CampusLifePillar = ContentEntry & {
  readonly title: string;
  readonly lead: string;
  readonly body: RichText;
  readonly highlights: readonly string[];
  readonly image: ContentImage | null;
};

export type UpdateKind = "notice" | "event" | "news";

export type Update = ContentEntry & {
  readonly kind: UpdateKind;
  readonly title: string;
  readonly excerpt: string;
  readonly publishedAt: IsoDate;
  readonly happensAt: IsoDate | null;
  readonly venue: string | null;
  readonly link: ContentLink | null;
  readonly image: ContentImage | null;
};

export type Testimonial = ContentEntry & {
  readonly quote: string;
  readonly name: string;
  readonly programme: string;
  readonly graduatedYear: number | null;
  readonly portrait: ContentImage | null;
};

export type AdmissionCall = ContentEntry & {
  readonly levelSlug: Slug;
  readonly title: string;
  readonly note: string | null;
  readonly link: ContentLink | null;
};

export type HomeSectionId =
  | "about"
  | "levels"
  | "programmes"
  | "affiliations"
  | "partners"
  | "campusLife"
  | "stats"
  | "testimonials"
  | "updates"
  | "admission";

export type SectionCopy = {
  readonly navLabel: string;
  readonly eyebrow: string | null;
  readonly heading: string;
  readonly standfirst: string | null;
  readonly cta: ContentLink | null;
  readonly emptyState: string | null;
};

export type HeroCopy = {
  readonly eyebrow: string;
  readonly headline: string;
  readonly standfirst: string;
  readonly primaryCta: ContentLink;
  readonly secondaryCta: ContentLink;
  readonly image: ContentImage | null;
};

export type HomeCopy = {
  readonly hero: HeroCopy;
  readonly sections: Readonly<Record<HomeSectionId, SectionCopy>>;
};

export type AboutSectionId = "chronology" | "emblem" | "creed" | "recognition";

export type AboutSection = {
  readonly heading: string;
  readonly standfirst: string | null;
};

export type AboutCopy = {
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly title: string;
  readonly standfirst: string;
  readonly openingImage: ContentImage | null;
  readonly creedImage: ContentImage | null;
  readonly sections: Readonly<Record<AboutSectionId, AboutSection>>;
};
