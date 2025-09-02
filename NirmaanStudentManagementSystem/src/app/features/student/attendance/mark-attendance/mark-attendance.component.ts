import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Attendance } from '../../../../core/models/attendance.model';
import { AttendanceService } from '../../../../core/services/attendance.service';
import { AttendanceStatus } from '../../../../core/models/enums';

@Component({
  selector: 'app-mark-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mark-attendance.component.html',
  styleUrl: './mark-attendance.component.css',
})
export class MarkAttendanceComponent implements OnInit {
  manualQrCode: string = '';
  loading = false;
  successMessage = '';
  errorMessage = '';
  todayAttendance: Attendance | null = null;

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit(): void {
    this.checkTodayAttendance();
  }

  markAttendance(): void {
    if (!this.manualQrCode.trim()) {
      this.errorMessage = 'Please enter a QR code';
      return;
    }

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.attendanceService.markAttendance(this.manualQrCode.trim()).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success && response.data) {
          this.successMessage = 'Attendance marked successfully!';
          this.todayAttendance = response.data;
          this.manualQrCode = '';
        }
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage =
          error.error?.message ||
          'Failed to mark attendance. Please try again.';
      },
    });
  }

  private checkTodayAttendance(): void {
    const today = new Date().toISOString().split('T')[0];
    this.attendanceService.getAttendanceByDate(today).subscribe({
      next: (response) => {
        if (response.success && response.data && response.data.length > 0) {
          this.todayAttendance = response.data[0];
        }
      },
      error: (error) => {
        console.error("Error checking today's attendance:", error);
      },
    });
  }

  getStatusClass(status: AttendanceStatus): string {
    switch (status) {
      case AttendanceStatus.PRESENT:
        return 'text-green-600';
      case AttendanceStatus.LATE:
        return 'text-yellow-600';
      case AttendanceStatus.ABSENT:
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  }
}
