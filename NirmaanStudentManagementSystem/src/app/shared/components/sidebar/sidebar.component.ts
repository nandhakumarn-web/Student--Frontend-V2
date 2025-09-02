import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Output() toggle = new EventEmitter<void>();

  user: User | null = null;

  constructor(private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  get menuItems() {
    const role = this.user?.role;
    
    const baseItems = [
      { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    ];

    if (role === 'ADMIN') {
      return [
        ...baseItems,
        { label: 'User Management', icon: 'people', route: '/admin/users' },
        { label: 'Course Management', icon: 'school', route: '/admin/courses' },
        { label: 'Batch Management', icon: 'group', route: '/admin/batches' },
        { label: 'Reports', icon: 'assessment', route: '/reports' },
      ];
    } else if (role === 'TRAINER') {
      return [
        ...baseItems,
        { label: 'My Batches', icon: 'group', route: '/trainer/batches' },
        { label: 'Quiz Management', icon: 'quiz', route: '/trainer/quizzes' },
        { label: 'Attendance', icon: 'calendar', route: '/trainer/attendance' },
        { label: 'My Profile', icon: 'person', route: '/trainer/profile' },
      ];
    } else if (role === 'STUDENT') {
      return [
        ...baseItems,
        { label: 'Mark Attendance', icon: 'check', route: '/student/attendance/mark' },
        { label: 'Attendance History', icon: 'history', route: '/student/attendance/history' },
        { label: 'Available Quizzes', icon: 'quiz', route: '/student/quizzes' },
        { label: 'Submit Feedback', icon: 'feedback', route: '/student/feedback' },
        { label: 'My Profile', icon: 'person', route: '/student/profile' },
      ];
    }

    return baseItems;
  }

  getIcon(iconName: string): string {
    const icons: { [key: string]: string } = {
      dashboard: '📊',
      people: '👥',
      school: '🏫',
      group: '👥',
      assessment: '📋',
      quiz: '❓',
      calendar: '📅',
      person: '👤',
      check: '✅',
      history: '📅',
      feedback: '💬'
    };
    return icons[iconName] || '📄';
  }

  closeSidebar(): void {
    this.toggle.emit();
  }
}