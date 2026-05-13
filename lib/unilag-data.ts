export const GRADE_POINTS: Record<string, number> = {
  A1: 4.0,
  B2: 3.6,
  B3: 3.2,
  C4: 2.8,
  C5: 2.4,
  C6: 2.0,
  D7: 1.6,
  E8: 1.2,
  F9: 0,
};

export const GRADES = Object.keys(GRADE_POINTS);

export const CUTOFF_YEARS = [2025, 2024] as const;

export type CutoffEntry = {
  course: string;
  /** Cutoff per year, indexed by CUTOFF_YEARS order */
  cutoffs: Record<number, number>;
};

export type Cutoffs = Record<string, CutoffEntry[]>;

export const CUTOFFS: Cutoffs = {
  "Faculty of Science": [
    { course: "Computer Science", cutoffs: { 2025: 83.425, 2024: 79.775 } },
    { course: "Mathematics", cutoffs: { 2025: 63.675, 2024: 65.025 } },
    { course: "Physics", cutoffs: { 2025: 60.25, 2024: 54.225 } },
    { course: "Chemistry", cutoffs: { 2025: 59.5, 2024: 67.95 } },
    { course: "Microbiology", cutoffs: { 2025: 68.075, 2024: 69.175 } },
    { course: "Biochemistry", cutoffs: { 2025: 69.4, 2024: 53.025 } },
    { course: "Statistics", cutoffs: { 2025: 65.925, 2024: 69.9 } },
    { course: "Botany", cutoffs: { 2025: 51.45, 2024: 50.525 } },
    { course: "Zoology", cutoffs: { 2025: 57.25, 2024: 53.6 } },
  ],
  "Faculty of Engineering": [
    { course: "Chemical Engineering", cutoffs: { 2025: 72.8, 2024: 69.05 } },
    { course: "Civil Engineering", cutoffs: { 2025: 75.625, 2024: 72.7 } },
    { course: "Computer Engineering", cutoffs: { 2025: 82.875, 2024: 81.3 } },
    { course: "Electrical Engineering", cutoffs: { 2025: 79.5, 2024: 74.925 } },
    {
      course: "Mechanical Engineering",
      cutoffs: { 2025: 78.525, 2024: 75.05 },
    },
    {
      course: "Petroleum Engineering",
      cutoffs: { 2025: 70.725, 2024: 56.925 },
    },
    { course: "Systems Engineering", cutoffs: { 2025: 78.225, 2024: 76.3 } },
  ],
  "College of Medicine": [
    { course: "Medicine & Surgery", cutoffs: { 2025: 85.025, 2024: 82.125 } },
    { course: "Dentistry", cutoffs: { 2025: 76.55, 2024: 77.4 } },
    { course: "Pharmacy", cutoffs: { 2025: 76.4, 2024: 75.65 } },
    { course: "Physiotherapy", cutoffs: { 2025: 74.725, 2024: 74.475 } },
    { course: "Nursing", cutoffs: { 2025: 79.8, 2024: 76.0 } },
    { course: "Radiography", cutoffs: { 2025: 77.375, 2024: 75.175 } },
  ],
  "Faculty of Arts": [
    { course: "English", cutoffs: { 2025: 68.175, 2024: 66.8 } },
    { course: "History", cutoffs: { 2025: 70.725, 2024: 69.65 } },
    { course: "Philosophy", cutoffs: { 2025: 66.075, 2024: 65.425 } },
    { course: "Linguistics", cutoffs: { 2025: 72.55, 2024: 66.675 } },
    { course: "Creative Arts", cutoffs: { 2025: 69.5, 2024: 68.825 } },
  ],
  "Faculty of Social Sciences": [
    { course: "Economics", cutoffs: { 2025: 73.475, 2024: 71.65 } },
    { course: "Mass Communication", cutoffs: { 2025: 74.075, 2024: 73.45 } },
    { course: "Political Science", cutoffs: { 2025: 68.15, 2024: 66.85 } },
    { course: "Psychology", cutoffs: { 2025: 69.7, 2024: 69.825 } },
    { course: "Sociology", cutoffs: { 2025: 68.275, 2024: 66.575 } },
    { course: "Geography", cutoffs: { 2025: 57.475, 2024: 55.6 } },
  ],
  "Faculty of Law": [
    { course: "Law", cutoffs: { 2025: 78.225, 2024: 76.025 } },
  ],
  "Faculty of Management Sciences": [
    { course: "Accounting", cutoffs: { 2025: 75.7, 2024: 74.4 } },
    {
      course: "Business Administration",
      cutoffs: { 2025: 69.3, 2024: 68.675 },
    },
    { course: "Finance", cutoffs: { 2025: 70.35, 2024: 69.35 } },
    { course: "Actuarial Science", cutoffs: { 2025: 64.925, 2024: 67.275 } },
    { course: "Insurance", cutoffs: { 2025: 65.85, 2024: 64.975 } },
  ],
  "Faculty of Education": [
    { course: "Adult Education", cutoffs: { 2025: 53.525, 2024: 53.675 } },
    {
      course: "Educational Administration",
      cutoffs: { 2025: 51.63, 2024: 51.55 },
    },
    { course: "Human Kinetics", cutoffs: { 2025: 54.25, 2024: 55.7 } },
  ],
  "Faculty of Environmental Sciences": [
    { course: "Architecture", cutoffs: { 2025: 75.575, 2024: 75.1 } },
    { course: "Estate Management", cutoffs: { 2025: 57.525, 2024: 59.3 } },
    { course: "Quantity Surveying", cutoffs: { 2025: 64.3, 2024: 67.9 } },
    {
      course: "Urban & Regional Planning",
      cutoffs: { 2025: 53.5, 2024: 52.85 },
    },
  ],
};

export function calculateAggregate(
  jamb: number,
  postUtme: number,
  grades: string[],
) {
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
