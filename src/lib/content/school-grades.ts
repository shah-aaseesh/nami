const FIRST_GRADE = "I";
const LAST_GRADE = "VII";

export const schoolGrades = {
  first: FIRST_GRADE,
  last: LAST_GRADE,
  label: `Grade ${FIRST_GRADE}–${LAST_GRADE}`,
  labelPlural: `Grades ${FIRST_GRADE}–${LAST_GRADE}`,
} as const;
