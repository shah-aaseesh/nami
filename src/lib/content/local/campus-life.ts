import { entryOf } from "../identifiers";
import { richText } from "../rich-text";
import type { CampusLifePillar } from "../types";
import { serviceCamp } from "./images";

export const campusLife: readonly CampusLifePillar[] = [
  {
    ...entryOf("incubation-centre"),
    title: "Naaya Aayam Avinaya Prerana Kendra",
    lead: "The innovation and incubation centre, built with Startup Discovery Asia.",
    body: richText(
      "NAMI's Innovation and Incubation Centre is designed to transform ideas into impactful ventures. Established in collaboration with Startup Discovery Asia (SDA), a leading startup ecosystem enabler in South Asia, it gives aspiring entrepreneurs access to mentorship, networking, business development support and industry expertise.",
      "Whether the idea is a technology startup, a social enterprise, research-based innovation, a creative venture or a sustainable business, students get the guidance and resources to refine, test and scale it.",
    ),
    highlights: [
      "Entrepreneurial training and capacity-building workshops",
      "Mentorship from entrepreneurs, academics and industry experts",
      "Startup ideation, business model development and validation",
      "Networking events, innovation challenges and startup competitions",
      "Support for prototype development, market research and venture growth",
      "A collaborative workspace for creativity and teamwork",
    ],
    image: null,
  },
  {
    ...entryOf("service-learning"),
    title: "Service Learning",
    lead: "Students design, launch and finish their own community projects.",
    body: richText(
      "The goal of Service Learning at NAMI International School is to help each student find their own way to make a positive impact, instilling a love of service that lasts a lifetime.",
      "Students learn coordination, leadership and effective communication, run their initiatives under adult supervision, and document their progress through reflective essays, diaries and journals.",
    ),
    highlights: [
      "Student-led initiatives from design to delivery",
      "Coordination, leadership and communication skills",
      "Reflective essays, diaries and project journals",
    ],
    image: serviceCamp,
  },
  {
    ...entryOf("leadership-and-careers"),
    title: "Leadership & Career Counselling",
    lead: "Structured career guidance, mentorship and leadership development.",
    body: richText(
      "NAMI treats career counselling and leadership development as core student support: structured career guidance, skills assessment, mentorship and exposure to diverse academic and professional pathways, alongside training, workshops and experiential learning.",
      "A monthly motivational series, \"Motivational Stories by Inspirational Leaders of Change\", brings successful figures from different fields to students from secondary to Master's level. The NAMI Golden Z Club Orientation Program develops leadership through global leadership values and women's empowerment initiatives, in interaction with experienced Zontians.",
    ),
    highlights: [
      "Skills assessment and one-to-one mentorship",
      '"Motivational Stories by Inspirational Leaders of Change"',
      "NAMI Golden Z Club",
    ],
    image: null,
  },
  {
    ...entryOf("industry-exposure"),
    title: "Industry Exposure",
    lead: "Internships, mentorship, placements and collaborative research.",
    body: richText(
      "NAMI has established partnerships with leading industry players across banking, technology, media, hospitality and capital markets. These collaborations give students internships, mentorship, job placements and collaborative research, closing the gap between academic learning and industry expectations.",
    ),
    highlights: [
      "Internships and job placements with partner organisations",
      "Mentorship from working professionals",
      "Collaborative research projects",
    ],
    image: null,
  },
  {
    ...entryOf("sustainability"),
    title: "Sustainability",
    lead: "A plastic-free campus aligned with the UN Sustainable Development Goals.",
    body: richText(
      "Sustainability is a core principle at NAMI, embedded in its operations, academic framework and strategic development: renewable energy, efficient resource management, structured waste segregation and recycling, reduced reliance on paper, sustainable mobility across the campus and a plastic-free zone.",
      "These initiatives are aligned with the United Nations Sustainable Development Goals, particularly climate action, responsible consumption and production, and quality education, and are carried into teaching through interdisciplinary curricula, applied research and community engagement.",
    ),
    highlights: [
      "Renewable energy and efficient resource management",
      "Waste segregation, recycling and a plastic-free zone",
      "Curriculum, research and community engagement on environmental challenges",
    ],
    image: null,
  },
];
