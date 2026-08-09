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
    title: "School, Grade 1–6",
    note: "Application form for NAMI International School.",
    link: {
      label: "Visit School Website",
      href: "https://school.nami.edu.np",
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
      label: "Visit College Website",
      href: "https://college.nami.edu.np/",
      destination: "external",
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
