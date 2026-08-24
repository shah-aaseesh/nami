import type { InstitutionGalleryTone } from "@/components/shared/institution-gallery";
import { InstitutionGallery } from "@/components/shared/institution-gallery";
import type { EntityRole } from "@/lib/content";

const sharedGalleryCopy = {
  eyebrow: "The campus",
  heading: "Campus life, photographed.",
  standfirst:
    "Convocations, panels, field days, sports, classrooms and the ordinary weeks between them — our own record of what a day here looks like.",
  ctaLabel: "See more",
  ctaAccessibleLabel: "See more campus photographs",
};

export function SharedCampusGallery({
  institution,
  tone,
}: {
  readonly institution: EntityRole;
  readonly tone?: InstitutionGalleryTone;
}) {
  return (
    <InstitutionGallery
      copy={sharedGalleryCopy}
      id="gallery"
      institution={institution}
      tone={tone}
    />
  );
}
