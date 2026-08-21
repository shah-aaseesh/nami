import type { InstitutionGalleryCopy } from "@/components/shared/institution-gallery";
import type { InstitutionNoticesCopy } from "@/components/shared/institution-notices";
import type { ContentImage, ContentLink, SectionCopy } from "@/lib/content";
import { richText } from "@/lib/content";
import type { CollegeCambridgeCopy } from "./college-cambridge";
import type { CollegeEntryCopy } from "./college-entry";
import type { CollegeSubjectsCopy } from "./college-subjects";

export type CollegeMastheadCopy = {
  readonly heroLabel: string;
  readonly slides: readonly ContentImage[];
  readonly heading: string;
  readonly standfirst: string;
  readonly cta: ContentLink;
  readonly establishedLabel: string;
  readonly statusLabel: string;
  readonly statusValue: string;
  readonly campusLabel: string;
};

const principalPortrait: ContentImage = {
  src: "/nami/principal-philip-badikar-hilario.jpg",
  alt: "Philip Badikar Hilario, A Level Principal at NAMI College, standing in a checked jacket and holding a folder.",
  width: 233,
  height: 430,
};

const heroSlides: readonly ContentImage[] = [
  {
    src: "/nami/campus-basketball-award.jpg",
    alt: "Prize-giving for the NAMI SEE 3x3 Basketball Tournament on the college auditorium stage, both teams wearing medals and holding certificates behind the winners' trophy and the tournament cheques.",
    width: 1500,
    height: 1000,
  },
  {
    src: "/nami/campus-science-lab-2.jpg",
    alt: "A NAMI practical laboratory, blue-topped stools ranked along a long bench of sinks and glassware with microscopes set out on the counter opposite.",
    width: 1280,
    height: 853,
  },
  {
    src: "/nami/campus-sports.jpg",
    alt: "Students on the NAMI sports ground during a campus tournament or sports day.",
    width: 1500,
    height: 1000,
  },
];

const masthead: CollegeMastheadCopy = {
  heroLabel: "NAMI College campus",
  slides: heroSlides,
  heading: "NAMI College",
  standfirst:
    "An independent Cambridge Assessment International Education examination centre, and an accredited Cambridge International Home Centre in Nepal since June 2024.",
  cta: {
    label: "Apply to NAMI College",
    href: "https://college.nami.edu.np/",
    destination: "external",
  },
  establishedLabel: "Established",
  statusLabel: "Status",
  statusValue: "Independent CAIE examination centre",
  campusLabel: "Campus",
};

const cambridge: CollegeCambridgeCopy = {
  eyebrow: "The qualification",
  heading: "An international benchmark, taught in small classes.",
  standfirst:
    "The A Level is administered by Cambridge Assessment International Education, University of Cambridge, United Kingdom.",
  propositions: [
    {
      title: "Science and non-science streams",
      body: "Students take both science and non-science combinations, so management and humanities sit alongside the sciences.",
    },
    {
      title: "Project-based learning",
      body: "Learning runs through projects across subjects. Students explore, experiment, challenge ideas and take leadership roles, with the emphasis on creativity and critical thinking.",
    },
    {
      title: "Seasoned faculty, small classes",
      body: "NAMI teaches the programme with seasoned faculty, small class sizes and a friendly, caring approach. The college is fully co-educational.",
    },
    {
      title: "Recognised preparation",
      body: "Cambridge qualifications are an international benchmark, and a recognised preparation for university study and for employment.",
    },
  ],
};

const subjects: CollegeSubjectsCopy = {
  eyebrow: "Subjects",
  heading: "Two streams, and the subjects in each.",
  standfirst:
    "The college offers a wide range of subjects and subject combinations, preparing students for university study in science, medicine, engineering, business and the liberal arts.",
  compulsoryNote:
    "English General Paper is compulsory in every group. Students choose one stream, then take their remaining subjects from a single group within it.",
  compulsoryLabel: "Compulsory",
  streams: [
    {
      key: "science",
      label: "Science",
      minimumNote:
        "A minimum of four subjects is required to qualify in the science stream.",
      overlapNote:
        "The two groups share seven subjects. Biology is offered in Group S1 only, and Economics in Group S2 only.",
      listLabel:
        "A Level science subjects offered at NAMI College, and whether each one is available in Group S1, Group S2 or both.",
      groups: [
        { key: "s1", short: "S1", label: "Group S1" },
        { key: "s2", short: "S2", label: "Group S2" },
      ],
      subjects: [
        {
          name: "English General Paper (AS)",
          compulsory: true,
          groups: ["s1", "s2"],
        },
        { name: "Physics", compulsory: false, groups: ["s1", "s2"] },
        { name: "Chemistry", compulsory: false, groups: ["s1", "s2"] },
        { name: "Mathematics", compulsory: false, groups: ["s1", "s2"] },
        { name: "Biology", compulsory: false, groups: ["s1"] },
        { name: "Economics", compulsory: false, groups: ["s2"] },
        { name: "Computer Science", compulsory: false, groups: ["s1", "s2"] },
        { name: "Psychology", compulsory: false, groups: ["s1", "s2"] },
        { name: "Sociology", compulsory: false, groups: ["s1", "s2"] },
      ],
    },
    {
      key: "non-science",
      label: "Non-science",
      minimumNote:
        "A minimum of five subjects is required to qualify in the non-science stream.",
      overlapNote:
        "The two groups share three subjects. Accounting, Mathematics and Computer Science are offered in Group NS1 only, and Sociology, Psychology and Art and Design in Group NS2 only.",
      listLabel:
        "A Level non-science subjects offered at NAMI College, and whether each one is available in Group NS1, Group NS2 or both.",
      groups: [
        { key: "ns1", short: "NS1", label: "Group NS1" },
        { key: "ns2", short: "NS2", label: "Group NS2" },
      ],
      subjects: [
        {
          name: "English General Paper (AS)",
          compulsory: true,
          groups: ["ns1", "ns2"],
        },
        { name: "Business", compulsory: false, groups: ["ns1", "ns2"] },
        { name: "Economics", compulsory: false, groups: ["ns1", "ns2"] },
        { name: "Accounting", compulsory: false, groups: ["ns1"] },
        { name: "Mathematics", compulsory: false, groups: ["ns1"] },
        { name: "Computer Science", compulsory: false, groups: ["ns1"] },
        { name: "Sociology", compulsory: false, groups: ["ns2"] },
        { name: "Psychology", compulsory: false, groups: ["ns2"] },
        { name: "Art and Design", compulsory: false, groups: ["ns2"] },
      ],
    },
  ],
  offeredLabel: (group) => `Offered in ${group}`,
  notOfferedLabel: (group) => `Not offered in ${group}`,
};

const gallery: InstitutionGalleryCopy = {
  eyebrow: "The campus",
  heading: "Two years, photographed.",
  standfirst:
    "Trips, tournaments, service camps and the ordinary weeks between them — the college's own record of what an A Level here looks like.",
  ctaLabel: "All college photographs",
};

const alumni: SectionCopy = {
  navLabel: "Alumni",
  eyebrow: "Alumni",
  heading: "What the programme is worth, from the people who finished it.",
  standfirst:
    "A Level alumni on the teaching, the workload and what the qualification carried them into.",
  cta: null,
  emptyState:
    "A Level alumni stories will appear here as graduates share them.",
};

const notices: InstitutionNoticesCopy = {
  eyebrow: "Notice board",
  heading: "What the college is announcing.",
  standfirst:
    "Registration windows, examination dates and standing notices for A Level students and their families.",
  ctaLabel: "All college notices",
  emptyState:
    "There is no college notice standing right now. Everything the college has published stays on the notice board.",
};

const entry: CollegeEntryCopy = {
  eyebrow: "Entry and support",
  heading: "Who it is for, and how it is supported.",
  cta: {
    label: "Start an application",
    href: "https://college.nami.edu.np/",
    destination: "external",
  },
  blocks: [
    {
      title: "Eligibility",
      body: "Students who have completed SEE, GCSE, CBSE or an equivalent qualification at the time of admission. What the programme asks for is the academic ability to meet its demands.",
    },
    {
      title: "Scholarships",
      body: "Scholarships are offered to highly meritorious students who are financially weak, and further scholarships are available to other deserving candidates.",
    },
  ],
};

export const collegeCopy = {
  meta: {
    title: "NAMI College",
    description:
      "NAMI College teaches the Cambridge International A Level at Gokarneshwor-7, Kathmandu — an independent CAIE examination centre and, since June 2024, an accredited Cambridge International Home Centre in Nepal.",
  },
  campusSlug: "gokarneshwor",
  levelSlug: "college",
  masthead,
  principal: {
    slug: "leader-phillip-hilario",
    eyebrow: "From the Principal",
    portrait: principalPortrait,
    message: richText(
      "Dear Parents and well-wishers,",
      "I am thrilled to share with you the exciting news that our college has been accredited as a Cambridge International Home Center in Nepal since June 2024.",
      "This prestigious recognition is a testament to our commitment to providing high-quality education and fostering an environment of academic excellence.",
      "Our students have started to exhibit their skills by becoming Nepal toppers in various subjects under the A level program. We are dedicated to nurturing our students’ intellectual curiosity and preparing them for success in an ever-evolving world.",
      "We extend our gratitude to the entire college community for their unwavering support and dedication. Together, we will continue to inspire and empower our students to reach new heights of academic achievement.",
    ),
  },
  cambridge,
  subjects,
  gallery,
  alumni,
  entry,
  notices,
} as const;
