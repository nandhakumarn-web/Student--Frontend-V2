import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Attendance } from '../models/attendance.model';
import { AttendanceStatus } from '../models/enums';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  markAttendance(qrCodeId: string): Observable<ApiResponse<Attendance>> {
    return this.http.post<ApiResponse<Attendance>>(
      `${this.API_URL}/attendance/mark`,
      null,
      {
        params: { qrCodeId },
      }
    );
  }

  getMyAttendance(): Observable<ApiResponse<Attendance[]>> {
    return this.http.get<ApiResponse<Attendance[]>>(
      `${this.API_URL}/attendance/my-attendance`
    );
  }

  getAttendanceByDate(date: string): Observable<ApiResponse<Attendance[]>> {
    return this.http.get<ApiResponse<Attendance[]>>(
      `${this.API_URL}/attendance/date/${date}`
    );
  }

  markManualAttendance(
    studentId: number,
    status: AttendanceStatus,
    date?: string
  ): Observable<ApiResponse<Attendance>> {
    const params: any = { studentId, status };
    if (date) params.date = date;

    return this.http.post<ApiResponse<Attendance>>(
      `${this.API_URL}/attendance/mark-manual`,
      null,
      { params }
    );
  }

  bulkMarkAttendance(
    attendanceMap: { [key: number]: AttendanceStatus },
    date?: string
  ): Observable<ApiResponse<Attendance[]>> {
    const params = date ? { date } : {};
    return this.http.post<ApiResponse<Attendance[]>>(
      `${this.API_URL}/attendance/bulk-mark`,
      attendanceMap,
      { params }
    );
  }
}
