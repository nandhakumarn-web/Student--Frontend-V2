import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FeedbackType } from '../models/enums';
import { Feedback } from '../models/feedback.model';
import { ApiResponse } from '../models/api-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  submitFeedback(feedback: {
    feedbackType: FeedbackType;
    rating: number;
    comments: string;
    anonymous: boolean;
    targetId?: number; // courseId, trainerId, etc.
  }): Observable<ApiResponse<Feedback>> {
    return this.http.post<ApiResponse<Feedback>>(`${this.API_URL}/feedback`, feedback);
  }

  getMyFeedback(): Observable<ApiResponse<Feedback[]>> {
    return this.http.get<ApiResponse<Feedback[]>>(`${this.API_URL}/feedback/my-feedback`);
  }

  getAllFeedback(): Observable<ApiResponse<Feedback[]>> {
    return this.http.get<ApiResponse<Feedback[]>>(`${this.API_URL}/feedback`);
  }

  getFeedbackByType(type: FeedbackType): Observable<ApiResponse<Feedback[]>> {
    return this.http.get<ApiResponse<Feedback[]>>(`${this.API_URL}/feedback/type/${type}`);
  }

  getFeedbackForTrainer(trainerId: number): Observable<ApiResponse<Feedback[]>> {
    return this.http.get<ApiResponse<Feedback[]>>(`${this.API_URL}/feedback/trainer/${trainerId}`);
  }

  getFeedbackForCourse(courseId: number): Observable<ApiResponse<Feedback[]>> {
    return this.http.get<ApiResponse<Feedback[]>>(`${this.API_URL}/feedback/course/${courseId}`);
  }

  deleteFeedback(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.API_URL}/feedback/${id}`);
  }
}
