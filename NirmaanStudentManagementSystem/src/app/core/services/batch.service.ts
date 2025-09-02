import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Batch } from '../models/batch.model';

@Injectable({
  providedIn: 'root'
})
export class BatchService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllBatches(): Observable<ApiResponse<Batch[]>> {
    return this.http.get<ApiResponse<Batch[]>>(`${this.API_URL}/batches`);
  }

  getBatchById(id: number): Observable<ApiResponse<Batch>> {
    return this.http.get<ApiResponse<Batch>>(`${this.API_URL}/batches/${id}`);
  }

  getMyBatches(): Observable<ApiResponse<Batch[]>> {
    return this.http.get<ApiResponse<Batch[]>>(`${this.API_URL}/batches/my-batches`);
  }

  createBatch(batch: Partial<Batch>): Observable<ApiResponse<Batch>> {
    return this.http.post<ApiResponse<Batch>>(`${this.API_URL}/batches`, batch);
  }

  updateBatch(id: number, batch: Partial<Batch>): Observable<ApiResponse<Batch>> {
    return this.http.put<ApiResponse<Batch>>(`${this.API_URL}/batches/${id}`, batch);
  }

  deleteBatch(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.API_URL}/batches/${id}`);
  }

  getBatchStudents(batchId: number): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.API_URL}/batches/${batchId}/students`);
  }
}

