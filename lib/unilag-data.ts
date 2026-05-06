export const GRADE_POINTS: Record<string, number> = {
  A1: 4.0, B2: 3.6, B3: 3.2, C4: 2.8, C5: 2.4, C6: 2.0, D7: 1.6, E8: 1.2, F9: 0,
};

export const GRADES = Object.keys(GRADE_POINTS);

export const CUTOFF_YEARS = [2025, 2024, 2023, 2022, 2021] as const;

export type CutoffEntry = {
  course: string;
  /** Cutoff per year, indexed by CUTOFF_YEARS order */
  cutoffs: Record<number, number>;
};

export type Cutoffs = Record<string, CutoffEntry[]>;

// Helper: build a 5-year series with small variation around a base
function series(base: number, deltas: [number, number, number, number, number]): Record<number, number> {
  return {
    2025: base + deltas[0],
    2024: base + deltas[1],
    2023: base + deltas[2],
    2022: base + deltas[3],
    2021: base + deltas[4],
  };
}

export const CUTOFFS: Cutoffs = {
  "Faculty of Science": [
    { course: "Computer Science", cutoffs: series(75, [0, -1, -2, -3, -4]) },
    { course: "Mathematics", cutoffs: series(62, [0, -1, -1, -3, -4]) },
    { course: "Physics", cutoffs: series(60, [0, -2, -1, -3, -5]) },
    { course: "Chemistry", cutoffs: series(63, [0, -1, -2, -2, -4]) },
    { course: "Microbiology", cutoffs: series(70, [0, -1, -2, -3, -4]) },
    { course: "Biochemistry", cutoffs: series(72, [0, -2, -2, -3, -5]) },
    { course: "Statistics", cutoffs: series(65, [0, -1, -2, -3, -4]) },
    { course: "Botany", cutoffs: series(58, [0, -1, -1, -2, -3]) },
    { course: "Zoology", cutoffs: series(60, [0, -1, -2, -3, -4]) },
  ],
  "Faculty of Engineering": [
    { course: "Chemical Engineering", cutoffs: series(78, [0, -1, -2, -3, -5]) },
    { course: "Civil Engineering", cutoffs: series(73, [0, -1, -2, -3, -4]) },
    { course: "Computer Engineering", cutoffs: series(76, [0, -1, -2, -3, -5]) },
    { course: "Electrical Engineering", cutoffs: series(75, [0, -1, -2, -3, -4]) },
    { course: "Mechanical Engineering", cutoffs: series(74, [0, -1, -2, -3, -4]) },
    { course: "Petroleum Engineering", cutoffs: series(80, [0, -2, -3, -4, -6]) },
    { course: "Systems Engineering", cutoffs: series(72, [0, -1, -2, -3, -4]) },
  ],
  "College of Medicine": [
    { course: "Medicine & Surgery", cutoffs: series(85, [0, -1, -2, -4, -6]) },
    { course: "Dentistry", cutoffs: series(78, [0, -1, -2, -3, -5]) },
    { course: "Pharmacy", cutoffs: series(80, [0, -1, -2, -3, -5]) },
    { course: "Physiotherapy", cutoffs: series(75, [0, -1, -2, -3, -4]) },
    { course: "Nursing", cutoffs: series(76, [0, -1, -2, -3, -5]) },
    { course: "Radiography", cutoffs: series(72, [0, -1, -2, -3, -4]) },
  ],
  "Faculty of Arts": [
    { course: "English", cutoffs: series(68, [0, -1, -2, -3, -4]) },
    { course: "History", cutoffs: series(58, [0, -1, -1, -2, -3]) },
    { course: "Philosophy", cutoffs: series(56, [0, -1, -1, -2, -3]) },
    { course: "Linguistics", cutoffs: series(60, [0, -1, -2, -2, -3]) },
    { course: "Creative Arts", cutoffs: series(58, [0, -1, -1, -2, -3]) },
  ],
  "Faculty of Social Sciences": [
    { course: "Economics", cutoffs: series(74, [0, -1, -2, -3, -5]) },
    { course: "Mass Communication", cutoffs: series(78, [0, -1, -2, -3, -5]) },
    { course: "Political Science", cutoffs: series(70, [0, -1, -2, -3, -4]) },
    { course: "Psychology", cutoffs: series(72, [0, -1, -2, -3, -4]) },
    { course: "Sociology", cutoffs: series(68, [0, -1, -2, -3, -4]) },
    { course: "Geography", cutoffs: series(60, [0, -1, -2, -2, -3]) },
  ],
  "Faculty of Law": [
    { course: "Law", cutoffs: series(82, [0, -2, -3, -4, -6]) },
  ],
  "Faculty of Management Sciences": [
    { course: "Accounting", cutoffs: series(76, [0, -1, -2, -3, -5]) },
    { course: "Business Administration", cutoffs: series(72, [0, -1, -2, -3, -4]) },
    { course: "Finance", cutoffs: series(73, [0, -1, -2, -3, -4]) },
    { course: "Actuarial Science", cutoffs: series(70, [0, -1, -2, -3, -4]) },
    { course: "Insurance", cutoffs: series(65, [0, -1, -2, -3, -4]) },
  ],
  "Faculty of Education": [
    { course: "Adult Education", cutoffs: series(55, [0, -1, -1, -2, -3]) },
    { course: "Educational Administration", cutoffs: series(58, [0, -1, -1, -2, -3]) },
    { course: "Human Kinetics", cutoffs: series(56, [0, -1, -1, -2, -3]) },
  ],
  "Faculty of Environmental Sciences": [
    { course: "Architecture", cutoffs: series(72, [0, -1, -2, -3, -4]) },
    { course: "Estate Management", cutoffs: series(68, [0, -1, -2, -3, -4]) },
    { course: "Quantity Surveying", cutoffs: series(66, [0, -1, -2, -3, -4]) },
    { course: "Urban & Regional Planning", cutoffs: series(62, [0, -1, -2, -2, -3]) },
  ],
};

export function calculateAggregate(jamb: number, postUtme: number, grades: string[]) {
  const jambPart = jamb / 8;
  const olevelPart = grades.reduce((s, g) => s + (GRADE_POINTS[g] ?? 0), 0);
  const total = jambPart + postUtme + olevelPart;
  return {
    jambPart: +jambPart.toFixed(2),
    postUtme,
    olevelPart: +olevelPart.toFixed(2),
    total: +total.toFixed(2),
  };
}
