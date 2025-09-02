import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { QRCodeData } from '../models/qrcode.model';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  generateQRCode(batchId?: number): Observable<ApiResponse<QRCodeData>> {
    const params = batchId ? { batchId: batchId.toString() } : {};
    return this.http.post<ApiResponse<QRCodeData>>(
      `${this.API_URL}/qr-code/generate`,
      {},
      { params }
    );
  }

  validateQRCode(qrCodeId: string): Observable<ApiResponse<boolean>> {
    return this.http.get<ApiResponse<boolean>>(
      `${this.API_URL}/qr-code/validate/${qrCodeId}`
    );
  }

  getActiveQRCodes(): Observable<ApiResponse<QRCodeData[]>> {
    return this.http.get<ApiResponse<QRCodeData[]>>(
      `${this.API_URL}/qr-code/active`
    );
  }

  deactivateQRCode(qrCodeId: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(
      `${this.API_URL}/qr-code/${qrCodeId}`
    );
  }
}