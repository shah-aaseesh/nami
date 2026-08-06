import { entryOf, slug } from "../identifiers";
import type { Affiliation } from "../types";
import { AWARDING_BODIES } from "./awarding-bodies";
import { logoImage } from "./placeholders";

export const affiliations: readonly Affiliation[] = [
  {
    ...entryOf("neb-school"),
    body: AWARDING_BODIES.neb,
    scope: "Grades One to Seven",
    sinceYear: 2024,
    levelSlug: slug("school"),
    campusSlug: slug("gokarneshwor"),
    note: null,
    logo: logoImage,
  },
  {
    ...entryOf("neb-plus-two"),
    body: AWARDING_BODIES.neb,
    scope: "10+2, Science and Management",
    sinceYear: 2019,
    levelSlug: slug("plus-two"),
    campusSlug: slug("gokarneshwor"),
    note: null,
    logo: logoImage,
  },
  {
    ...entryOf("cambridge"),
    body: AWARDING_BODIES.cambridge,
    scope: "A-Level programme, science and non-science",
    sinceYear: 2013,
    levelSlug: slug("a-level"),
    campusSlug: slug("gokarneshwor"),
    note: "Independent CAIE examination centre since 2024",
    logo: logoImage,
  },
  {
    ...entryOf("northampton"),
    body: AWARDING_BODIES.northampton,
    scope: "Undergraduate and postgraduate",
    sinceYear: 2012,
    levelSlug: slug("bachelor-master"),
    campusSlug: slug("new-baneshwor"),
    note: null,
    logo: logoImage,
  },
  {
    ...entryOf("kathmandu-university"),
    body: AWARDING_BODIES.kathmanduUniversity,
    scope: "BSc Environmental Studies",
    sinceYear: 2026,
    levelSlug: slug("bachelor-master"),
    campusSlug: slug("new-baneshwor"),
    note: "First intake August 2026",
    logo: logoImage,
  },
];
