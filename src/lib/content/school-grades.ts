const FIRST_GRADE = 1;
const LAST_GRADE = 7;

export const schoolGrades = {
  first: FIRST_GRADE,
  last: LAST_GRADE,
  label: `Grade ${FIRST_GRADE}–${LAST_GRADE}`,
  labelPlural: `Grades ${FIRST_GRADE}–${LAST_GRADE}`,
} as const;
