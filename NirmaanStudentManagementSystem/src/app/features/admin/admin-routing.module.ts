import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'users',
    children: [
      {
        path: '',
        loadComponent: () => import('./user-management/user-list/user-list.component').then(m => m.UserListComponent)
      },
      {
        path: 'create',
        loadComponent: () => import('./user-management/user-form/user-form.component').then(m => m.UserFormComponent)
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./user-management/user-form/user-form.component').then(m => m.UserFormComponent)
      }
    ]
  },
  {
    path: 'courses',
    children: [
      {
        path: '',
        loadComponent: () => import('./course-management/course-list/course-list.component').then(m => m.CourseListComponent)
      },
      {
        path: 'create',
        loadComponent: () => import('./course-management/course-form/course-form.component').then(m => m.CourseFormComponent)
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./course-management/course-form/course-form.component').then(m => m.CourseFormComponent)
      }
    ]
  },
  {
    path: 'batches',
    children: [
      {
        path: '',
        loadComponent: () => import('./batch-management/batch-list/batch-list.component').then(m => m.BatchListComponent)
      },
      {
        path: 'create',
        loadComponent: () => import('./batch-management/batch-form/batch-form.component').then(m => m.BatchFormComponent)
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./batch-management/batch-form/batch-form.component').then(m => m.BatchFormComponent)
      }
    ]
  }
];