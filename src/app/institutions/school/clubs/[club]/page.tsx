import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  type ClubSlug,
  findSchoolClub,
  SCHOOL_CLUBS,
} from "@/app/institutions/school/_components/school-clubs-copy";
import { createMetadata } from "@/lib/seo";
import { ClubActivities } from "./_components/club-activities";
import { ClubJoinCta } from "./_components/club-join-cta";
import { ClubMasthead } from "./_components/club-masthead";
import { ClubOtherRail } from "./_components/club-other-rail";
import { ClubOverview } from "./_components/club-overview";
import { ClubSkills } from "./_components/club-skills";

export const dynamicParams = false;

export function generateStaticParams(): { club: ClubSlug }[] {
  return SCHOOL_CLUBS.map((club) => ({ club: club.slug }));
}

type Props = {
  params: Promise<{ club: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { club: slug } = await params;
  const club = findSchoolClub(slug);

  if (!club) {
    return createMetadata({ path: "/institutions/school" });
  }

  return createMetadata({
    path: `/institutions/school/clubs/${club.slug}`,
    title: `${club.title} | NAMI International School`,
    description: club.metaDescription,
    image: {
      url: club.coverImage.src,
      width: club.coverImage.width,
      height: club.coverImage.height,
      alt: club.coverImage.alt,
    },
  });
}

export default async function ClubDetailPage({ params }: Props) {
  const { club: slug } = await params;
  const club = findSchoolClub(slug);

  if (!club) {
    notFound();
  }

  return (
    <>
      <ClubMasthead club={club} />
      <ClubOverview club={club} />
      <ClubActivities club={club} />
      <ClubSkills club={club} />
      <ClubJoinCta club={club} />
      <ClubOtherRail currentClub={club} />
    </>
  );
}
