import { entryOf } from "../identifiers";
import { richText } from "../rich-text";
import type { InstitutionProfile } from "../types";
import {
  gokarneshworMapUrl,
  gokarneshworStreetAddress,
  newBaneshworMapUrl,
  newBaneshworStreetAddress,
} from "./placeholders";

export const institution: InstitutionProfile = {
  entities: {
    institute: {
      role: "institute",
      name: "Naaya Aayam Multi-Disciplinary Institute",
      shortName: "NAMI",
      establishedYear: 2012,
    },
    college: {
      role: "college",
      name: "NAMI",
      shortName: "NAMI",
      establishedYear: 2012,
    },
    school: {
      // The brand book gives the school no founding year — 2019 and 2024 are
      // affiliation dates and belong to `affiliations`, not to this field.
      role: "school",
      name: "NAMI International School",
      shortName: "NAMI International School",
      establishedYear: null,
    },
  },
  motto: "Transform yourself, to lead the world",
  overview: richText(
    "Naaya Aayam Multi-Disciplinary Institute (NAMI) is an educational institution with the aim of contributing meaningfully to Nepal's social and economic development through the delivery of high-quality education. Established in 2012, NAMI is dedicated to provide world class education in Nepal.",
    "The institution places strong emphasis on holistic development, integrating rigorous academic training with extracurricular activities, leadership development and community engagement. By fostering an inclusive and supportive learning environment, NAMI prepares students not only for academic success but also for meaningful contributions to society and the global workforce.",
    "Its dedicated faculty, modern facilities and collaborative partnerships further enhance the educational experience, making NAMI a preferred choice for students seeking quality education in Nepal.",
  ),
  mission: richText(
    "To empower individuals with fundamental academic knowledge, life skills and values that foster a genuine love for learning, and prepare them to impact their own lives and the lives of others positively.",
  ),
  vision: richText(
    "To offer access to world-class education within Nepal, fostering human capital development among the youth and empowering them to become responsible individuals contributing to society, both locally and globally.",
  ),
  emblemStory: richText(
    "The lotus flower, a representation of rebirth, blossoms in the dark and becomes a lovely plant in the NAMI logo. NAMI's core values are represented by each of the lotus's five petals.",
    'The heart, or "Hridaya", is symbolised by the red lotus in Sanskrit as love, passion, kindness and compassion. A fully blossomed red lotus represents the compassion and warmth of the human spirit. As our graduates enter the real world, we aim for NAMIANS to embody the spirit reflected in our logo.',
  ),
  values: [
    {
      ...entryOf("enlightenment"),
      name: "Enlightenment",
      meaning: "Ensures a complete and holistic development.",
    },
    {
      ...entryOf("knowledge"),
      name: "Knowledge",
      meaning:
        "The skills and awareness acquired through experience with situations and facts.",
    },
    {
      ...entryOf("purity-of-heart-and-mind"),
      name: "Purity of Heart and Mind",
      meaning:
        "Removes impurities from thoughts and thinking, promoting ethics and values for creating a compassionate society.",
    },
    {
      ...entryOf("self-awareness"),
      name: "Self-awareness",
      meaning:
        "Enhances the ability to recognise and understand one's own ideas, feelings and behaviours.",
    },
    {
      ...entryOf("wisdom"),
      name: "Wisdom",
      meaning: "The ability to reason logically and to behave wisely.",
    },
  ],
  campuses: [
    {
      ...entryOf("gokarneshwor"),
      locality: "Gokarneshwor-7",
      city: "Kathmandu",
      hosts: [
        "School, Grade 1–7",
        "+2 NEB, Science and Management",
        "Cambridge A-Level",
      ],
      streetAddress: gokarneshworStreetAddress,
      mapUrl: gokarneshworMapUrl,
    },
    {
      ...entryOf("new-baneshwor"),
      locality: "New Baneshwor",
      city: "Kathmandu",
      hosts: ["Undergraduate programmes", "Postgraduate programmes"],
      streetAddress: newBaneshworStreetAddress,
      mapUrl: newBaneshworMapUrl,
    },
  ],
  contact: {
    phones: ["+977 1 4917444", "+977 1 4917441"],
    email: "info@nami.edu.np",
    websites: [
      {
        label: "school.nami.edu.np",
        href: "https://school.nami.edu.np",
        destination: "external",
      },
      {
        label: "college.nami.edu.np",
        href: "https://college.nami.edu.np/",
        destination: "external",
      },
    ],
    socialProfiles: [
      {
        platform: "facebook",
        label: "Facebook",
        href: "https://www.facebook.com/NamiCollege/",
        destination: "external",
      },
      {
        platform: "instagram",
        label: "Instagram",
        href: "https://www.instagram.com/namicollege/",
        destination: "external",
      },
      {
        platform: "linkedin",
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/nami-college",
        destination: "external",
      },
      {
        platform: "twitter",
        label: "Twitter",
        href: "https://twitter.com/NamiCollege",
        destination: "external",
      },
      {
        platform: "youtube",
        label: "YouTube",
        href: "https://www.youtube.com/user/naminepal",
        destination: "external",
      },
    ],
  },
};
