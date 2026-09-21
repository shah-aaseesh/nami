import type { ContentImage } from "./types";
import { anishaPandayJoshiPortrait, anishaPrincipalMessagePortrait } from "./local/images";
import type { RichText } from "./rich-text";
import { richText } from "./rich-text";

export type SchoolPrincipalCopy = {
  readonly slug: string;
  readonly eyebrow: string;
  readonly message: RichText;
  readonly portrait?: ContentImage;
  readonly expandedPortrait?: ContentImage;
};

export const schoolPrincipal: SchoolPrincipalCopy = {
  slug: "leader-anisha-joshi",
  eyebrow: "From the Principal",
  portrait: anishaPandayJoshiPortrait,
  expandedPortrait: anishaPrincipalMessagePortrait,
  message: richText(
    "Ms. Anisha Panday Joshi is the Principal of NAMI International School, with more than 15 years of experience in education, school leadership, administration, and organizational management. She holds a Master’s in Business Administration in Marketing from Kathmandu University and a Master’s in University of Applied Research & Development from the National Open College Network (NOCN), United Kingdom.",
    "Throughout her career, Ms. Panday has worked in curriculum development, teacher development, school operations, student support, and academic leadership. Before joining NAMI, she served as a Secondary School Coordinator and English Language Teacher at Sanskriti International School and worked as an educational consultant at Shushrusha Serves. Her earlier experience in corporate marketing has also contributed to her strengths in communication, planning, teamwork, and organizational development.",
    "As Principal, she provides leadership across the Primary and Secondary School, working closely with students, teachers, parents, and the wider NAMI community. She oversees academic planning and development, curriculum and assessment, teacher development, student wellbeing, school operations, and contributes to policy planning, review, and implementation. She also works closely with staff and families to strengthen communication, build a positive school culture, and ensure that students receive the guidance and support they need to grow with confidence. In 2024, she became the Founding Principal of NAMI International School’s Primary Wing, which has since grown into the Primary and Middle School, playing a significant role in establishing its academic and operational foundations and shaping its culture from the outset.",
    "At the heart of her educational philosophy is the belief that schools should prepare students not only for academic success, but also to become thoughtful, responsible, confident, and compassionate individuals. She values open communication, collaboration, and shared responsibility, and believes that students make progress when they feel a genuine sense of belonging and are encouraged to take ownership of their choices and actions.",
    "For Ms. Panday, leading a school is not simply about managing an institution; it is about creating a place where young people feel that they belong, where teachers feel that their work matters, and where what students learn and experience at school stays with them long after they leave the classroom.",
  ),
};

