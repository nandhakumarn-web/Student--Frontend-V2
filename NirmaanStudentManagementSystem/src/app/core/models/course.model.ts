import { CourseType } from "./enums";

export interface Course {
  id: number;
  courseType: CourseType;
  courseName: string;
  description: string;
  durationMonths: number;
  syllabus: string;
  active: boolean;
}