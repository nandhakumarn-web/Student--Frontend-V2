import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly API_URL = environment.apiUrl;
  private unreadCountSubject = new BehaviorSubject<number>(0);
  public unreadCount$ = this.unreadCountSubject.asObservable();

  constructor(private http: HttpClient) { 
    this.loadUnreadCount();
  }

  getMyNotifications(): Observable<ApiResponse<Notification[]>> {
    return this.http.get<ApiResponse<Notification[]>>(`${this.API_URL}/notifications`);
  }

  getUnreadNotifications(): Observable<ApiResponse<Notification[]>> {
    return this.http.get<ApiResponse<Notification[]>>(`${this.API_URL}/notifications/unread`);
  }

  markAsRead(id: number): Observable<ApiResponse<void>> {
    return this.http.put<ApiResponse<void>>(`${this.API_URL}/notifications/${id}/read`, {});
  }

  markAllAsRead(): Observable<ApiResponse<void>> {
    return this.http.put<ApiResponse<void>>(`${this.API_URL}/notifications/mark-all-read`, {});
  }

  deleteNotification(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.API_URL}/notifications/${id}`);
  }

  createNotification(notification: {
    title: string;
    message: string;
    type: string;
    targetUserIds?: number[];
    targetRole?: string;
  }): Observable<ApiResponse<Notification>> {
    return this.http.post<ApiResponse<Notification>>(`${this.API_URL}/notifications`, notification);
  }

  private loadUnreadCount(): void {
    this.getUnreadNotifications().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.unreadCountSubject.next(response.data.length);
        }
      },
      error: () => {
        // Handle error silently for now
      }
    });
  }

  updateUnreadCount(): void {
    this.loadUnreadCount();
  }
}