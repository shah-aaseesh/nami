import type { ContentImage, RichText } from "@/lib/content";
import { richText } from "@/lib/content";

export const principalSlug = "leader-anisha-joshi";

export const principalEyebrow = "From the Principal";

export const principalHeading = "A message from our School Principal.";

export const principalPortrait: ContentImage = {
  src: "/team/anisha-panday-joshi.webp",
  alt: "Studio portrait of Ms. Anisha Panday Joshi, Principal of NAMI International School, hands clasped in an olive and red patterned sari over a red blouse against a mottled blue-grey backdrop.",
  width: 1154,
  height: 1600,
};

export const principalExcerpt: RichText = richText(
  "My personal and professional commitment at NAMI International School is to guide the growth of students and ensure a nurturing environment for all.",
  "At NAMI International School, we hold a deep conviction that education should be a catalyst for bringing out the best in every child. We work towards enhancing knowledge, skill, ability and the overall potential of individuals to become successful and ready for a world that never ceases to change.",
);
