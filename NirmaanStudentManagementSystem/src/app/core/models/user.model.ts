import { CourseType, Role } from "./enums";

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  phoneNumber?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  email: string;
  role: Role;
  firstName: string;
  lastName: string;
}

export interface UserRegistrationRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
  phoneNumber?: string;
  dateOfBirth?: Date;
  address?: string;
  emergencyContact?: string;
  enrolledCourse?: CourseType;
  qualification?: string;
  specialization?: string;
  qualifications?: string;
  experienceYears?: number;
  certification?: string;
}
