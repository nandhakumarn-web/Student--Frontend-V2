import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred';
        
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = error.error.message;
        } else {
          // Server-side error
          switch (error.status) {
            case 401:
              // Unauthorized - redirect to login
              this.authService.logout();
              this.router.navigate(['/auth/login']);
              errorMessage = 'Session expired. Please login again.';
              break;
            case 403:
              // Forbidden
              this.router.navigate(['/unauthorized']);
              errorMessage = 'Access denied.';
              break;
            case 404:
              errorMessage = 'Resource not found.';
              break;
            case 500:
              errorMessage = 'Internal server error. Please try again later.';
              break;
            default:
              errorMessage = error.error?.message || `Error Code: ${error.status}`;
          }
        }
        
        console.error('HTTP Error:', error);
        
        return throwError(() => ({
          ...error,
          message: errorMessage
        }));
      })
    );
  }
}