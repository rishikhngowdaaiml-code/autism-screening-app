export type Role = "parent" | "clinician";
export type User = {
  id: string;
  role: Role;
  name?: string;
  phone?: string;
  email?: string;
};
export type Child = {
  id: string;
  name: string;
  age: number;
  reports?: string[];
};
export type Report = {
  id: string;
  childId: string;
  date: string;
  answers: number[];
  modelScores: { rf: number; lr: number; svm: number };
  risk: number;
};
