import { pranilPandeyPortrait } from "./local/images";
import { richText, type RichText } from "./rich-text";
import type { ContentImage } from "./types";

export type CeoMessageCopy = {
  readonly slug: string;
  readonly eyebrow: string;
  readonly heading: string;
  readonly message: RichText;
  readonly portrait: ContentImage;
};

export const ceoMessage: CeoMessageCopy = {
  slug: "leader-pranil-pandey",
  eyebrow: "Message from the CEO",
  heading: "A message from our Chief Executive Officer.",
  portrait: pranilPandeyPortrait,
  message: richText(
    "Welcome to NAMI. Since our inception in 2012, our foundational mission has been to provide world-class, globally accredited education right here in Nepal. We believe that true academic excellence begins with an environment that fosters curiosity, integrity, and ambition, supported by state-of-the-art infrastructure and faculty who are deeply dedicated to student success.",
    "In an increasingly interconnected and rapidly evolving world, education must go beyond conventional classroom boundaries. Through strategic academic partnerships with premier international universities and dynamic collaborations with industry leaders, NAMI bridges rigorous academic theory with real-world competence. We emphasize critical thinking, computational capability, research orientation, and an entrepreneurial mindset across all our programs.",
    "Our holistic educational ecosystem is purposefully designed to nurture well-rounded individuals. Alongside academic depth, we place strong value on leadership development, community engagement, ethical values, and extracurricular enrichment. By empowering our students with both knowledge and character, we ensure they are prepared to excel in competitive global arenas and make meaningful contributions to their professions.",
    "As we look ahead, NAMI remains steadfast in its dedication to transformative education and institutional excellence. We invite our students, parents, alumni, and community partners to join hands with us as we continue to inspire innovation, shape impactful careers, and cultivate the next generation of visionary leaders for Nepal and the world.",
  ),
};
