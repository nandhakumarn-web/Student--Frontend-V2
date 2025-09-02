import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
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
        loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
      },
      {
        path: 'admin',
        loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'trainer',
        loadChildren: () => import('./features/trainer/trainer.routes').then(m => m.TRAINER_ROUTES),
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'TRAINER'] }
      },
      {
        path: 'student',
        loadChildren: () => import('./features/student/student.routes').then(m => m.STUDENT_ROUTES),
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'TRAINER', 'STUDENT'] }
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];