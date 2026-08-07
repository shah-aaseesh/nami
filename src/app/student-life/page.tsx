import type { Metadata } from "next";

import { content } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { CampusLifeList } from "./_components/campus-life-list";
import { studentLifeCopy } from "./_components/student-life-copy";
import { StudentLifeMasthead } from "./_components/student-life-masthead";

export const metadata: Metadata = createMetadata({
  path: "/student-life",
  title: studentLifeCopy.meta.title,
  description: studentLifeCopy.meta.description,
});

export default async function StudentLifePage() {
  const pillars = await content.getCampusLife();

  return (
    <>
      <StudentLifeMasthead copy={studentLifeCopy.masthead} />
      <CampusLifeList pillars={pillars} />
    </>
  );
}
