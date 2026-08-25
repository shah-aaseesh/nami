import type { InstitutionGalleryTone } from "@/components/shared/institution-gallery";
import { InstitutionGallery } from "@/components/shared/institution-gallery";
import type { EntityRole } from "@/lib/content";

function getGalleryCopy(institution: EntityRole) {
  const isSchool = institution === "school";
  return {
    eyebrow: isSchool ? "The school" : "The college",
    heading: isSchool
      ? "School life, photographed."
      : "College life, photographed.",
    standfirst:
      "Convocations, panels, field days, sports, classrooms and the ordinary weeks between them — our own record of what a day here looks like.",
    ctaLabel: "See more",
    ctaAccessibleLabel: isSchool
      ? "See more school photographs"
      : "See more college photographs",
  };
}

export function SharedCollegeGallery({
  institution,
  tone = "brand",
}: {
  readonly institution: EntityRole;
  readonly tone?: InstitutionGalleryTone;
}) {
  return (
    <InstitutionGallery
      copy={getGalleryCopy(institution)}
      id="gallery"
      institution={institution}
      tone={tone}
    />
  );
}
