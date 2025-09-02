import { Routes } from '@angular/router';
import { AdminDashboardComponent } from '../app/features/dashboard/admin-dashboard/admin-dashboard.component';
import { TrainerDashboardComponent } from '../app/features/trainer/attendance-management/';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { AuthService } from '../../core/services/auth.service';
import { inject } from '@angular/core';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'redirect',
    pathMatch: 'full'
  },
  {
    path: 'redirect',
    canActivate: [() => {
      const authService = inject(AuthService);
      const user = AuthService.getCurrentUser();
      const router = inject(import('@angular/router').then(m => m.Router));
      
      switch (user?.role) {
        case 'ADMIN':
          router.navigate(['/dashboard/admin']);
          break;
        case 'TRAINER':
          router.navigate(['/dashboard/trainer']);
          break;
        case 'STUDENT':
          router.navigate(['/dashboard/student']);
          break;
        default:
          router.navigate(['/auth/login']);
      }
      return false;
    }],
    children: []
  },
  {
    path: 'admin',
    component: AdminDashboardComponent
  },
  {
    path: 'trainer',
    component: TrainerDashboardComponent
  },
  {
    path: 'student',
    component: StudentDashboardComponent
  }
];