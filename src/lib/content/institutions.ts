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

export type InquiryCourseId =
  | "school-primary"
  | "school-plus-two"
  | "a-level"
  | "degree";

export type InquiryCourse = {
  readonly id: InquiryCourseId;
  readonly label: string;
  readonly institutionId: InstitutionId;
  readonly historyStepLabel: string;
  readonly historyHeading: string;
  readonly asksPendingQualifications: boolean;
  readonly asksEmploymentHistory: boolean;
};

// Diverges from INSTITUTIONS on purpose (decided 2026-08-20): the inquiry select splits the
// school into two levels, which the admissions cards and the header nav must NOT do.
export const INQUIRY_COURSES: readonly InquiryCourse[] = [
  {
    id: "school-primary",
    label: `NAMI Intl School (${schoolGrades.first} to ${schoolGrades.last})`,
    institutionId: "school",
    historyStepLabel: "Education History",
    historyHeading: "Education History",
    asksPendingQualifications: false,
    asksEmploymentHistory: false,
  },
  {
    id: "school-plus-two",
    label: "NAMI Intl School (+2)",
    institutionId: "school",
    historyStepLabel: "Education History",
    historyHeading: "Education History",
    asksPendingQualifications: true,
    asksEmploymentHistory: false,
  },
  {
    id: "a-level",
    label: "NAMI A-Level",
    institutionId: "college",
    historyStepLabel: "Education History",
    historyHeading: "Education History",
    asksPendingQualifications: true,
    asksEmploymentHistory: false,
  },
  {
    id: "degree",
    label: "NAMI",
    institutionId: "bachelors",
    historyStepLabel: "Qualifications",
    historyHeading: "Qualifications Achieved",
    asksPendingQualifications: true,
    asksEmploymentHistory: true,
  },
];

export function findInquiryCourse(id: string): InquiryCourse | undefined {
  return INQUIRY_COURSES.find((course) => course.id === id);
}

export function findInstitution(id: InstitutionId): Institution | undefined {
  return INSTITUTIONS.find((institution) => institution.id === id);
}
