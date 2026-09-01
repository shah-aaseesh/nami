import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  A_LEVELS_CLUBS,
  type ALevelsClubSlug,
  findALevelsClub,
} from "@/app/institutions/a-levels/_components/a-levels-clubs-copy";
import { createMetadata } from "@/lib/seo";
import { ClubActivities } from "./_components/club-activities";
import { ClubJoinCta } from "./_components/club-join-cta";
import { ClubMasthead } from "./_components/club-masthead";
import { ClubOtherRail } from "./_components/club-other-rail";
import { ClubOverview } from "./_components/club-overview";
import { ClubSkills } from "./_components/club-skills";

export const dynamicParams = false;

export function generateStaticParams(): { club: ALevelsClubSlug }[] {
  return A_LEVELS_CLUBS.map((club) => ({ club: club.slug }));
}

type Props = {
  params: Promise<{ club: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { club: slug } = await params;
  const club = findALevelsClub(slug);

  if (!club) {
    return createMetadata({ path: "/institutions/a-levels" });
  }

  return createMetadata({
    path: `/institutions/a-levels/clubs/${club.slug}`,
    title: `${club.title} | NAMI College A-Levels`,
    description: club.metaDescription,
    image: {
      url: club.coverImage.src,
      width: club.coverImage.width,
      height: club.coverImage.height,
      alt: club.coverImage.alt,
    },
  });
}

export default async function ALevelsClubDetailPage({ params }: Props) {
  const { club: slug } = await params;
  const club = findALevelsClub(slug);

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
