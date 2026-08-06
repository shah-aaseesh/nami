import { entryOf, slug } from "../identifiers";
import type { AdmissionCall } from "../types";
import {
  bachelorMasterAdmissionLink,
  plusTwoAdmissionLink,
} from "./placeholders";

export const admissionCalls: readonly AdmissionCall[] = [
  {
    ...entryOf("admission-school"),
    levelSlug: slug("school"),
    title: "School, Grade 1–7",
    note: "Application form for NAMI International School.",
    link: {
      label: "View admission notice",
      href: "https://school.nami.edu.np/notice/2",
      destination: "external",
    },
  },
  {
    ...entryOf("admission-plus-two"),
    levelSlug: slug("plus-two"),
    title: "+2 NEB, Science and Management",
    note: null,
    link: plusTwoAdmissionLink,
  },
  {
    ...entryOf("admission-a-level"),
    levelSlug: slug("a-level"),
    title: "Cambridge A-Level",
    note: null,
    link: {
      label: "View admission notice",
      href: "https://college.nami.edu.np/notice/2",
      destination: "legacy",
    },
  },
  {
    ...entryOf("admission-bachelor-master"),
    levelSlug: slug("bachelor-master"),
    title: "Bachelor & Master",
    note: null,
    link: bachelorMasterAdmissionLink,
  },
];
