import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Trainer } from '../models/trainer.model';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllTrainers(): Observable<ApiResponse<Trainer[]>> {
    return this.http.get<ApiResponse<Trainer[]>>(`${this.API_URL}/trainers`);
  }

  getTrainerById(id: number): Observable<ApiResponse<Trainer>> {
    return this.http.get<ApiResponse<Trainer>>(`${this.API_URL}/trainers/${id}`);
  }

  getMyProfile(): Observable<ApiResponse<Trainer>> {
    return this.http.get<ApiResponse<Trainer>>(`${this.API_URL}/trainers/profile`);
  }

  updateProfile(trainer: Partial<Trainer>): Observable<ApiResponse<Trainer>> {
    return this.http.put<ApiResponse<Trainer>>(`${this.API_URL}/trainers/profile`, trainer);
  }

  getTrainerStats(trainerId?: number): Observable<ApiResponse<any>> {
    const url = trainerId 
      ? `${this.API_URL}/trainers/${trainerId}/stats`
      : `${this.API_URL}/trainers/my-stats`;
    return this.http.get<ApiResponse<any>>(url);
  }
}