import { Component, OnDestroy, OnInit } from '@angular/core';
import { QRCodeData } from '../../../../core/models/qrcode.model';
import { Batch } from '../../../../core/models/batch.model';
import { Attendance } from '../../../../core/models/attendance.model';
import { QrcodeService } from '../../../../core/services/qrcode.service';
import { BatchService } from '../../../../core/services/batch.service';
import { AttendanceService } from '../../../../core/services/attendance.service';

@Component({
  selector: 'app-qr-code-display',
  imports: [],
  templateUrl: './qr-code-display.component.html',
  styleUrl: './qr-code-display.component.css'
})
export class QrCodeDisplayComponent implements OnInit, OnDestroy {
  qrCodeData: QRCodeData | null = null;
  batches: Batch[] = [];
  selectedBatchId: number | null = null;
  loading = false;
  errorMessage = '';
  liveAttendance: Attendance[] = [];
  
  private refreshInterval: any;

  constructor(
    private qrcodeService: QrcodeService,
    private batchService: BatchService,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit(): void {
    this.loadBatches();
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  loadBatches(): void {
    this.batchService.getMyBatches().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.batches = response.data;
        }
      },
      error: (error) => {
        console.error('Error loading batches:', error);
        // Demo data for development
        this.batches = [
          {
            id: 1,
            batchName: 'JAVA-2024-01',
            courseId: 1,
            courseName: 'Java Full Stack Development',
            trainerId: 1,
            trainerName: 'John Smith',
            startDate: new Date('2024-01-15'),
            endDate: new Date('2024-07-15'),
            maxStudents: 30,
            currentStudents: 25,
            schedule: 'Mon-Fri 9:00 AM - 5:00 PM',
            active: true
          },
          {
            id: 2,
            batchName: 'ITES-2024-02',
            courseId: 2,
            courseName: 'ITES Program',
            trainerId: 1,
            trainerName: 'John Smith',
            startDate: new Date('2024-02-01'),
            endDate: new Date('2024-08-01'),
            maxStudents: 25,
            currentStudents: 20,
            schedule: 'Mon-Fri 10:00 AM - 6:00 PM',
            active: true
          }
        ];
      }
    });
  }

  generateQRCode(): void {
    if (!this.selectedBatchId) {
      this.errorMessage = 'Please select a batch';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.qrcodeService.generateQRCode(this.selectedBatchId).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.qrCodeData = response.data;
          this.startLiveAttendanceRefresh();
        }
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to generate QR code';
        this.loading = false;
      }
    });
  }

  refreshQRCode(): void {
    this.generateQRCode();
  }

  deactivateQRCode(): void {
    if (this.qrCodeData && confirm('Are you sure you want to deactivate this QR code?')) {
      this.qrcodeService.deactivateQRCode(this.qrCodeData.qrCodeId).subscribe({
        next: (response) => {
          if (response.success) {
            this.qrCodeData = null;
            this.liveAttendance = [];
            this.stopLiveAttendanceRefresh();
          }
        },
        error: (error) => {
          this.errorMessage = 'Failed to deactivate QR code';
        }
      });
    }
  }

  private startLiveAttendanceRefresh(): void {
    this.refreshLiveAttendance();
    this.refreshInterval = setInterval(() => {
      this.refreshLiveAttendance();
    }, 5000); // Refresh every 5 seconds
  }

  private stopLiveAttendanceRefresh(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }

  private refreshLiveAttendance(): void {
    const today = new Date().toISOString().split('T')[0];
    this.attendanceService.getAttendanceByDate(today).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.liveAttendance = response.


        }
      }
    }
  }
}
          