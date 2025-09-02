import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Quiz } from '../models/quiz.model';
import { StudentQuizAttempt } from '../models/qrcode.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllQuizzes(): Observable<ApiResponse<Quiz[]>> {
    return this.http.get<ApiResponse<Quiz[]>>(`${this.API_URL}/quizzes`);
  }

  getQuizById(id: number): Observable<ApiResponse<Quiz>> {
    return this.http.get<ApiResponse<Quiz>>(`${this.API_URL}/quizzes/${id}`);
  }

  getActiveQuizzes(): Observable<ApiResponse<Quiz[]>> {
    return this.http.get<ApiResponse<Quiz[]>>(`${this.API_URL}/quizzes/active`);
  }

  getMyQuizzes(): Observable<ApiResponse<Quiz[]>> {
    return this.http.get<ApiResponse<Quiz[]>>(`${this.API_URL}/quizzes/my-quizzes`);
  }

  createQuiz(quiz: Partial<Quiz>): Observable<ApiResponse<Quiz>> {
    return this.http.post<ApiResponse<Quiz>>(`${this.API_URL}/quizzes`, quiz);
  }

  updateQuiz(id: number, quiz: Partial<Quiz>): Observable<ApiResponse<Quiz>> {
    return this.http.put<ApiResponse<Quiz>>(`${this.API_URL}/quizzes/${id}`, quiz);
  }

  deleteQuiz(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.API_URL}/quizzes/${id}`);
  }

  startQuizAttempt(quizId: number): Observable<ApiResponse<StudentQuizAttempt>> {
    return this.http.post<ApiResponse<StudentQuizAttempt>>(`${this.API_URL}/quizzes/${quizId}/start`, {});
  }

  submitQuizAttempt(attemptId: number, answers: any): Observable<ApiResponse<StudentQuizAttempt>> {
    return this.http.post<ApiResponse<StudentQuizAttempt>>(`${this.API_URL}/quizzes/attempts/${attemptId}/submit`, { answers });
  }

  getMyQuizAttempts(): Observable<ApiResponse<StudentQuizAttempt[]>> {
    return this.http.get<ApiResponse<StudentQuizAttempt[]>>(`${this.API_URL}/quizzes/my-attempts`);
  }
}