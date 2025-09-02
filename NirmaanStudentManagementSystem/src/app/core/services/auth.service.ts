import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse, User } from '../models/user.model';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadUserFromStorage();
  }

  login(credentials: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.API_URL}/auth/login`, credentials)
      .pipe(
        tap(response => {
          if (response.success && response.data) {
            this.setSession(response.data);
          }
        })
      );
  }

  logout(): void {
    // Call backend logout endpoint if available
    this.http.post(`${this.API_URL}/auth/logout`, {}).subscribe({
      complete: () => {
        this.clearSession();
      },
      error: () => {
        // Clear session even if backend call fails
        this.clearSession();
      }
    });
  }

  refreshToken(): Observable<ApiResponse<LoginResponse>> {
    const token = this.getToken();
    return this.http.post<ApiResponse<LoginResponse>>(`${this.API_URL}/auth/refresh`, { token })
      .pipe(
        tap(response => {
          if (response.success && response.data) {
            this.setSession(response.data);
          }
        })
      );
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp < Date.now() / 1000;
      
      if (isExpired) {
        this.clearSession();
        return false;
      }
      
      return true;
    } catch {
      this.clearSession();
      return false;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this.getCurrentUser();
    return roles.includes(user?.role || '');
  }

  // Get user profile from backend
  getProfile(): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.API_URL}/auth/profile`);
  }

  private setSession(authResponse: LoginResponse): void {
    localStorage.setItem('token', authResponse.token);
    
    const user: User = {
      id: 0, // Will be updated from backend response
      username: authResponse.username,
      email: authResponse.email,
      firstName: authResponse.firstName,
      lastName: authResponse.lastName,
      role: authResponse.role,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);

    // Load full profile from backend
    this.loadUserProfile();
  }

  private loadUserProfile(): void {
    this.getProfile().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          localStorage.setItem('user', JSON.stringify(response.data));
          this.currentUserSubject.next(response.data);
        }
      },
      error: (error) => {
        console.error('Failed to load user profile:', error);
      }
    });
  }

  private clearSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  private loadUserFromStorage(): void {
    const user = localStorage.getItem('user');
    if (user && this.isAuthenticated()) {
      this.currentUserSubject.next(JSON.parse(user));
    } else {
      this.clearSession();
    }
  }
}