import { Routes } from '@angular/router';

export const STUDENT_ROUTES: Routes = [
  {
    path: 'attendance',
    children: [
      {
        path: 'mark',
        loadComponent: () => import('./attendance/mark-attendance/mark-attendance.component').then(m => m.MarkAttendanceComponent)
      },
      {
        path: 'history',
        loadComponent: () => import('./attendance/attendance-history/attendance-history.component').then(m => m.AttendanceHistoryComponent)
      }
    ]
  },
  {
    path: 'quizzes',
    children: [
      {
        path: '',
        loadComponent: () => import('./quiz/available-quizzes/available-quizzes.component').then(m => m.AvailableQuizzesComponent)
      },
      {
        path: ':id/attempt',
        loadComponent: () => import('./quiz/quiz-attempt/quiz-attempt.component').then(m => m.QuizAttemptComponent)
      },
      {
        path: 'results',
        loadComponent: () => import('./quiz/quiz-results/quiz-results.component').then(m => m.QuizResultsComponent)
      }
    ]
  },
  {
    path: 'feedback',
    children: [
      {
        path: '',
        loadComponent: () => import('./feedback/submit-feedback/submit-feedback.component').then(m => m.SubmitFeedbackComponent)
      },
      {
        path: 'history',
        loadComponent: () => import('./feedback/feedback-history/feedback-history.component').then(m => m.FeedbackHistoryComponent)
      }
    ]
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent)
  }
];