import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseService } from './api-response.service';
import { ApiResponse } from '../models/api-response.model';
import { User, UserRegistrationRequest } from '../models/user.model';
import { Student } from '../models/student.model';
import { Trainer } from '../models/trainer.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiBaseService {

  getAllUsers(): Observable<ApiResponse<User[]>> {
    return this.get<User[]>('/users');
  }

  getUserById(id: number): Observable<ApiResponse<User>> {
    return this.get<User>(`/users/${id}`);
  }

  createUser(user: UserRegistrationRequest): Observable<ApiResponse<User>> {
    return this.post<User>('/users/register', user);
  }

  updateUser(id: number, user: Partial<User>): Observable<ApiResponse<User>> {
    return this.put<User>(`/users/${id}`, user);
  }

  deleteUser(id: number): Observable<ApiResponse<void>> {
    return this.delete<void>(`/users/${id}`);
  }

  getAllStudents(): Observable<ApiResponse<Student[]>> {
    return this.get<Student[]>('/users/students');
  }

  getAllTrainers(): Observable<ApiResponse<Trainer[]>> {
    return this.get<Trainer[]>('/users/trainers');
  }

  getMyProfile(): Observable<ApiResponse<User>> {
    return this.get<User>('/users/profile');
  }

  updateMyProfile(user: Partial<User>): Observable<ApiResponse<User>> {
    return this.put<User>('/users/profile', user);
  }

  changePassword(oldPassword: string, newPassword: string): Observable<ApiResponse<void>> {
    return this.post<void>('/users/change-password', { oldPassword, newPassword });
  }
}
