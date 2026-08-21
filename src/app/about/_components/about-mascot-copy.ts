import type { RichText, SectionCopy } from "@/lib/content";
import { richText } from "@/lib/content";

export const mascotSection: SectionCopy = {
  navLabel: "The mascot",
  eyebrow: "The mascot",
  heading: "The swan carries the same five values.",
  standfirst: null,
  cta: null,
  emptyState: null,
};

export const mascotStory: RichText = richText(
  "NAMI's mascot is a graceful swan, representing the spirit and values of NAMI. With its snow-white feathers and elegant posture, the swan symbolizes purity, resilience, transformation, and excellence. Its warm and friendly expression reflects NAMI's welcoming community. Surrounded by a vibrant lotus flower inspired by the NAMI logo, the mascot embodies growth, knowledge, and nurturing. The lotus petals gently cradle the swan, symbolizing the supportive and interconnected nature of the NAMI family.",
  "With its wings slightly spread, the swan signifies NAMI students' readiness to soar toward new opportunities. The wings carry the same core values as the petals of the lotus above. The mascot was designed by a NAMI student, showcasing the creativity and spirit of the NAMI community.",
);
