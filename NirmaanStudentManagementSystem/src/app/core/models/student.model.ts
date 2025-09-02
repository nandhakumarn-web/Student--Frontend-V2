import { CourseType } from "./enums";

export interface Student {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  studentId: string;
  dateOfBirth?: Date;
  address?: string;
  emergencyContact?: string;
  enrolledCourse: CourseType;
  qualification?: string;
  enrollmentDate: Date;
  batchName?: string;
}
