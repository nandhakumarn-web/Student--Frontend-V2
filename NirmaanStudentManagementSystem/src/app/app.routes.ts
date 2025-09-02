import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ADMIN_ROUTES } from './features/admin/admin-routing.module';
import { TRAINER_ROUTES } from './features/trainer/trainer-routing.module';
import { STUDENT_ROUTES } from './features/student/student-routing.module';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
      }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        children: [
          {
            path: 'admin',
            loadComponent: () => import('./features/dashboard/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
            canActivate: [RoleGuard],
            data: { roles: ['ADMIN'] }
          },
          {
            path: 'trainer',
            loadComponent: () => import('./features/dashboard/trainer-dashboard/trainer-dashboard.component').then(m => m.TrainerDashboardComponent),
            canActivate: [RoleGuard],
            data: { roles: ['TRAINER'] }
          },
          {
            path: 'student',
            loadComponent: () => import('./features/dashboard/student-dashboard/student-dashboard.component').then(m => m.StudentDashboardComponent),
            canActivate: [RoleGuard],
            data: { roles: ['STUDENT'] }
          }
        ]
      },
      {
        path: 'admin',
        children: ADMIN_ROUTES,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'trainer',
        children: TRAINER_ROUTES,
        canActivate: [RoleGuard],
        data: { roles: ['TRAINER'] }
      },
      {
        path: 'student',
        children: STUDENT_ROUTES,
        canActivate: [RoleGuard],
        data: { roles: ['STUDENT'] }
      }
    ]
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./shared/components/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
  },
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];