import type { ContentImage, RichText } from "@/lib/content";
import { richText } from "@/lib/content";

export const principalSlug = "leader-anisha-joshi";

export const principalEyebrow = "From the Principal";

export const principalHeading = "A message from our School Principal.";

export const principalPortrait: ContentImage = {
  src: "/nami/school-principal.jpg",
  alt: "Ms. Anisha Panday Joshi, Principal of NAMI International School, smiling with hands clasped, wearing a deep red long coat over a patterned cream-and-red shawl, cut out on a white background.",
  width: 378,
  height: 442,
};

export const principalExcerpt: RichText = richText(
  "My personal and professional commitment at NAMI International School is to guide the growth of students and ensure a nurturing environment for all.",
  "At NAMI International School, we hold a deep conviction that education should be a catalyst for bringing out the best in every child. We work towards enhancing knowledge, skill, ability and the overall potential of individuals to become successful and ready for a world that never ceases to change.",
);
