import { entryOf, slug } from "../identifiers";
import { schoolGrades } from "../school-grades";
import type { AdmissionCall } from "../types";
import {
  bachelorMasterAdmissionLink,
  plusTwoAdmissionLink,
} from "./placeholders";

export const admissionCalls: readonly AdmissionCall[] = [
  {
    ...entryOf("admission-school"),
    levelSlug: slug("school"),
    title: `School, ${schoolGrades.label}`,
    note: "Application form for NAMI International School.",
    link: {
      label: "Visit School Website",
      href: "https://school.nami.edu.np",
      destination: "external",
    },
  },
  {
    ...entryOf("admission-plus-two"),
    levelSlug: slug("school"),
    title: "+2 NEB, Science and Management",
    note: null,
    link: plusTwoAdmissionLink,
  },
  {
    ...entryOf("admission-a-level"),
    levelSlug: slug("college"),
    title: "Cambridge A-Level",
    note: null,
    link: {
      label: "Visit College Website",
      href: "https://college.nami.edu.np/",
      destination: "external",
    },
  },
  {
    ...entryOf("admission-bachelor-master"),
    levelSlug: slug("bachelors"),
    title: "Bachelor & Master",
    note: null,
    link: bachelorMasterAdmissionLink,
  },
];
