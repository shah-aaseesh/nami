import type { Metadata } from "next";

import { content } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { careersCopy } from "./_components/careers-copy";
import { CareersMasthead } from "./_components/careers-masthead";
import { CareersVacancies } from "./_components/careers-vacancies";

export const metadata: Metadata = createMetadata({
  path: "/careers",
  title: careersCopy.meta.title,
  description: careersCopy.meta.description,
});

export default async function CareersPage() {
  const vacancies = await content.getVacancies();

  return (
    <>
      <CareersMasthead copy={careersCopy.masthead} />
      <CareersVacancies section={careersCopy.vacancies} vacancies={vacancies} />
    </>
  );
}
