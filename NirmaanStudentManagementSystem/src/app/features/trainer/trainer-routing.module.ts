import { Routes } from '@angular/router';

export const TRAINER_ROUTES: Routes = [
  {
    path: 'batches',
    children: [
      {
        path: '',
        loadComponent: () => import('./batch-management/my-batches/my-batches.component').then(m => m.MyBatchesComponent)
      },
      {
        path: ':id/students',
        loadComponent: () => import('./batch-management/batch-students/batch-students.component').then(m => m.BatchStudentsComponent)
      }
    ]
  },
  {
    path: 'quizzes',
    children: [
      {
        path: '',
        loadComponent: () => import('./quiz-management/quiz-list/quiz-list.component').then(m => m.QuizListComponent)
      },
      {
        path: 'create',
        loadComponent: () => import('./quiz-management/quiz-form/quiz-form.component').then(m => m.QuizFormComponent)
      },
      {
        path: ':id/edit',
        loadComponent: () => import('./quiz-management/quiz-form/quiz-form.component').then(m => m.QuizFormComponent)
      },
      {
        path: ':id/questions',
        loadComponent: () => import('./quiz-management/question-form/question-form.component').then(m => m.QuestionFormComponent)
      }
    ]
  },
  {
    path: 'attendance',
    children: [
      {
        path: '',
        loadComponent: () => import('./attendance-management/attendance-list/attendance-list.component').then(m => m.AttendanceListComponent)
      },
      {
        path: 'mark',
        loadComponent: () => import('./attendance-management/mark-attendance/mark-attendance.component').then(m => m.MarkAttendanceComponent)
      },
      {
        path: 'qr-code',
        loadComponent: () => import('./attendance-management/qr-code-display/qr-code-display.component').then(m => m.QrCodeDisplayComponent)
      }
    ]
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent)
  }
];