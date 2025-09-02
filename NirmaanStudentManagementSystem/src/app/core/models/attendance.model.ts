import { AttendanceStatus } from "./enums";

export interface Attendance {
  id: number;
  studentId: number;
  studentName: string;
  batchName: string;
  attendanceDate: Date;
  status: AttendanceStatus;
  markedAt: Date;
}