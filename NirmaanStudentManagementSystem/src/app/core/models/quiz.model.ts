import { CourseType } from "./enums";
import { Question } from "./question.model";

export interface Quiz {
  id: number;
  title: string;
  description: string;
  trainerName: string;
  courseType: CourseType;
  batchName?: string;
  timeLimit: number;
  startTime: Date;
  endTime: Date;
  active: boolean;
  questions: Question[];
}