import { entryOf, slug } from "../identifiers";
import { schoolGrades } from "../school-grades";
import type { Affiliation } from "../types";
import { AWARDING_BODIES } from "./awarding-bodies";

export const affiliations: readonly Affiliation[] = [
  {
    ...entryOf("neb-school"),
    body: AWARDING_BODIES.neb,
    scope: schoolGrades.labelPlural,
    sinceYear: 2024,
    levelSlug: slug("school"),
    campusSlug: slug("gokarneshwor"),
    note: null,
    logo: "/universities/neb.png",
  },
  {
    ...entryOf("neb-plus-two"),
    body: AWARDING_BODIES.neb,
    scope: "10+2, Science and Management",
    sinceYear: 2019,
    levelSlug: slug("school"),
    campusSlug: slug("gokarneshwor"),
    note: null,
    logo: "/universities/neb.png",
  },
  {
    ...entryOf("cambridge"),
    body: AWARDING_BODIES.cambridge,
    scope: "A-Level programme, science and non-science",
    sinceYear: 2013,
    levelSlug: slug("college"),
    campusSlug: slug("gokarneshwor"),
    note: "Independent CAIE examination centre since 2024",
    logo: "/universities/cambridge.png",
  },
  {
    ...entryOf("northampton"),
    body: AWARDING_BODIES.northampton,
    scope: "Undergraduate and postgraduate",
    sinceYear: 2012,
    levelSlug: slug("bachelors"),
    campusSlug: slug("new-baneshwor"),
    note: null,
    logo: "/universities/northampton.png",
  },
  {
    ...entryOf("kathmandu-university"),
    body: AWARDING_BODIES.kathmanduUniversity,
    scope: "BSc Environmental Studies",
    sinceYear: 2026,
    levelSlug: slug("bachelors"),
    campusSlug: slug("new-baneshwor"),
    note: "Program begins August 2026",
    logo: "/universities/Kathmandu_University_Logo.webp",
  },
  {
    ...entryOf("hertfordshire"),
    body: AWARDING_BODIES.hertfordshire,
    scope: "Upcoming undergraduate and postgraduate programmes",
    sinceYear: 2026,
    levelSlug: slug("bachelors"),
    campusSlug: slug("new-baneshwor"),
    note: "Programmes commencing in 2026",
    logo: "/universities/hertfordshire.png",
  },
];
