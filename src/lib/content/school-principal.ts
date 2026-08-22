import type { RichText } from "./rich-text";
import { richText } from "./rich-text";

export type SchoolPrincipalCopy = {
  readonly slug: string;
  readonly eyebrow: string;
  readonly message: RichText;
};

export const schoolPrincipal: SchoolPrincipalCopy = {
  slug: "leader-anisha-joshi",
  eyebrow: "From the Principal",
  message: richText(
    "My personal and professional commitment at NAMI International School is to guide the growth of students and ensure a nurturing environment for all.",
    "At NAMI International School, we hold a deep conviction that education should be a catalyst for bringing out the best in every child. We work towards enhancing knowledge, skill, ability and the overall potential of individuals to become successful and ready for a world that never ceases to change.",
    "As my understanding of the world deepens, so does my conviction that we need to raise a generation of empathetic and compassionate individuals. It is therefore crucial to instil a culture of care from an early age, both within the household and the school environment. This entails acknowledging parents as essential partners in moulding the educational path of the child.",
    "Keeping the above in mind, our school curriculum is crafted through extensive research and is designed to address various facets of development — cognitive, social-emotional, physical and creative. We aim to instil a genuine love for learning in our students, and therefore embrace each child as an individual with unique talent and potential.",
    "Academics at NAMI International School are not just about grades. Our focus is on creating an inclusive and caring community where every child feels seen, heard and supported in all manner of ways.",
    "Together with my team, we are dedicated to creating a centre of excellence in education, empowering students to become resilient lifelong learners and positive agents of change.",
  ),
};
