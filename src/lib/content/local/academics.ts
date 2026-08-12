import { entryOf, slug } from "../identifiers";
import { richText } from "../rich-text";
import { schoolGrades } from "../school-grades";
import type { AcademicLevel, Programme } from "../types";
import { AWARDING_BODIES } from "./awarding-bodies";
import { readingRoom, schoolTransport, studentsOnCampus } from "./images";

export const academicLevels: readonly AcademicLevel[] = [
  {
    ...entryOf("school"),
    entity: "school",
    stage: `${schoolGrades.label}, and +2 NEB in Science and Management`,
    summary: richText(
      `NAMI International School opened its primary division in 2024 and now teaches ${schoolGrades.labelPlural} within the framework of the Government of Nepal's National Curriculum, with Mandarin introduced as a foreign language from Grade I and computer instruction from the first grade.`,
      "The school has also offered National Examination Board affiliated +2 programmes in Science and Management since 2019, taught in modern classrooms with well-equipped science laboratories, ICT facilities and a well-stocked library.",
    ),
    highlights: [
      "National Curriculum, Government of Nepal",
      "Mandarin from Grade I",
      "+2 NEB in Science and Management since 2019",
      "Interactive-board classrooms and ICT from Grade 1",
      "Internships, volunteer engagement and career counselling",
    ],
    campusSlug: slug("gokarneshwor"),
    image: schoolTransport,
  },
  {
    ...entryOf("college"),
    entity: "college",
    stage: "Cambridge A-Level, entry from SEE, GCSE, CBSE or equivalent",
    summary: richText(
      "NAMI offers the globally recognised Cambridge A-Level programme. The International A Level, regarded as the gold standard by Cambridge Assessment International Education, holds the same value as its UK equivalent for university admissions.",
      "Since 2024 the college has been recognised as an independent CAIE examination centre, and offers subject combinations that prepare students for university study in Science, Medicine, Engineering, Business, Humanities and Liberal Arts.",
    ),
    highlights: [
      "Independent CAIE examination centre since 2024",
      "Science and non-science subject combinations",
      "Entry from SEE, GCSE, CBSE or equivalent",
      "Routes into Science, Medicine, Engineering, Business, Humanities and Liberal Arts",
    ],
    campusSlug: slug("gokarneshwor"),
    image: studentsOnCampus,
  },
  {
    ...entryOf("bachelors"),
    entity: "institute",
    stage: "Bachelor's and Master's degrees",
    summary: richText(
      "NAMI has been in academic collaboration with The University of Northampton, UK since 2012, teaching British degrees in Kathmandu across computing, engineering, environmental science and business administration.",
      "A Bachelor's programme in Environmental Studies affiliated with Kathmandu University begins in August 2026, combining environmental science, sustainability, policy development and practical field-based learning.",
    ),
    highlights: [
      "British degrees taught in Kathmandu since 2012",
      "MSc Computer Science",
      "BSc Environmental Studies with Kathmandu University from August 2026",
      "AWS Academy curriculum and certifications",
    ],
    campusSlug: slug("new-baneshwor"),
    image: readingRoom,
  },
];

export const programmes: readonly Programme[] = [
  {
    ...entryOf("bsc-computer-science"),
    title: "Computer Science",
    shortTitle: "Computer Science",
    qualification: "BSc (Hons)",
    awardingBody: AWARDING_BODIES.northampton,
    levelSlug: slug("bachelors"),
    startingFrom: null,
  },
  {
    ...entryOf("bsc-software-engineering"),
    title: "Software Engineering",
    shortTitle: "Software Engineering",
    qualification: "BSc (Hons)",
    awardingBody: AWARDING_BODIES.northampton,
    levelSlug: slug("bachelors"),
    startingFrom: null,
  },
  {
    ...entryOf("bsc-networking-engineering"),
    title: "Networking Engineering",
    shortTitle: "Networking Engineering",
    qualification: "BSc (Hons)",
    awardingBody: AWARDING_BODIES.northampton,
    levelSlug: slug("bachelors"),
    startingFrom: null,
  },
  {
    ...entryOf("bsc-environmental-science"),
    title: "Environmental Science",
    shortTitle: "Environmental Science",
    qualification: "BSc (Hons)",
    awardingBody: AWARDING_BODIES.northampton,
    levelSlug: slug("bachelors"),
    startingFrom: null,
  },
  {
    ...entryOf("bsc-business-administration"),
    title: "Business Administration",
    shortTitle: "Business Administration",
    qualification: "BSc (Hons)",
    awardingBody: AWARDING_BODIES.northampton,
    levelSlug: slug("bachelors"),
    startingFrom: null,
  },
  {
    ...entryOf("msc-computer-science"),
    title: "Computer Science",
    shortTitle: "Computer Science",
    qualification: "MSc",
    awardingBody: AWARDING_BODIES.northampton,
    levelSlug: slug("bachelors"),
    startingFrom: null,
  },
  {
    ...entryOf("bsc-environmental-studies"),
    title: "Environmental Studies",
    shortTitle: "Environmental Studies",
    qualification: "BSc",
    awardingBody: AWARDING_BODIES.kathmanduUniversity,
    levelSlug: slug("bachelors"),
    startingFrom: "August 2026",
  },
  {
    ...entryOf("bsc-data-science"),
    title: "Data Science",
    shortTitle: "Data Science",
    qualification: "BSc (Hons)",
    awardingBody: AWARDING_BODIES.hertfordshire,
    levelSlug: slug("bachelors"),
    startingFrom: "September 2026",
  },
  {
    ...entryOf("a-level-programme"),
    title: "Science and non-science subject combinations",
    shortTitle: "Science & Non-Science",
    qualification: "Cambridge International A-Level",
    awardingBody: AWARDING_BODIES.cambridge,
    levelSlug: slug("college"),
    startingFrom: null,
  },
  {
    ...entryOf("neb-science"),
    title: "Science",
    shortTitle: "Science",
    qualification: "NEB 10+2",
    awardingBody: AWARDING_BODIES.neb,
    levelSlug: slug("school"),
    startingFrom: null,
  },
  {
    ...entryOf("neb-management"),
    title: "Management",
    shortTitle: "Management",
    qualification: "NEB 10+2",
    awardingBody: AWARDING_BODIES.neb,
    levelSlug: slug("school"),
    startingFrom: null,
  },
];
