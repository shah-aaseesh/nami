import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo";
import type {
  BachelorsProgramme,
  CourseKey,
} from "../_components/bachelors-copy";
import { bachelorsCopy } from "../_components/bachelors-copy";
import { CourseAbout } from "./_components/course-about";
import { CourseCareer } from "./_components/course-career";
import { CourseEligibility } from "./_components/course-eligibility";
import { CourseMasthead } from "./_components/course-masthead";
import { CourseModules } from "./_components/course-modules";
import { CoursePending } from "./_components/course-pending";

export const dynamicParams = false;

const { programmes } = bachelorsCopy;

function findCourse(key: string): BachelorsProgramme | null {
  return programmes.items.find((item) => item.key === key) ?? null;
}

function pathOf(key: CourseKey): string {
  return `/institutions/bachelors/${key}`;
}

export function generateStaticParams(): { course: CourseKey }[] {
  return programmes.items.map((item) => ({ course: item.key }));
}

export async function generateMetadata(
  props: PageProps<"/institutions/bachelors/[course]">,
): Promise<Metadata> {
  const { course } = await props.params;
  const programme = findCourse(course);

  if (programme === null) {
    return createMetadata({ path: "/institutions/bachelors" });
  }

  return createMetadata({
    path: pathOf(programme.key),
    title: programme.fullTitle,
    description: programme.metaDescription,
    image: {
      url: programme.image.src,
      width: programme.image.width,
      height: programme.image.height,
      alt: programme.image.alt,
    },
  });
}

export default async function CoursePage(
  props: PageProps<"/institutions/bachelors/[course]">,
) {
  const { course } = await props.params;
  const programme = findCourse(course);

  if (programme === null) notFound();

  return (
    <>
      <CourseMasthead course={programme} eyebrow={programmes.eyebrow} />
      <CourseAbout course={programme} />
      <CourseModules course={programme} />
      <CourseEligibility course={programme} />
      <CoursePending course={programme} heading={programmes.pendingLabel} />
      <CourseCareer course={programme} />
    </>
  );
}
