import type { Route } from "next";
import { schoolGrades } from "@/lib/content/school-grades";

export type InstitutionId = "school" | "college" | "bachelors";

export type Institution = {
  readonly id: InstitutionId;
  readonly title: string;
  readonly href: Route;
  readonly applyLabel: string;
};

export const INSTITUTIONS: readonly Institution[] = [
  {
    id: "school",
    title: "NAMI International School",
    href: "/institutions/school",
    applyLabel: `NAMI International School (${schoolGrades.label} & NEB +2)`,
  },
  {
    id: "college",
    title: "NAMI College",
    href: "/institutions/college",
    applyLabel: "NAMI College",
  },
  {
    id: "bachelors",
    title: "Naaya Aayam Multi-Disciplinary Institute",
    href: "/institutions/bachelors",
    applyLabel: "Naaya Aayam Multi-Disciplinary Institute",
  },
];
