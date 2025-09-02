import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    
    if (token && !req.url.includes('/auth/login')) {
      const authReq = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return next.handle(authReq);
    }
    
    // For login requests, don't add auth header but add content-type
    if (req.url.includes('/auth/login')) {
      const loginReq = req.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
      return next.handle(loginReq);
    }
    
    return next.handle(req);
  }
}