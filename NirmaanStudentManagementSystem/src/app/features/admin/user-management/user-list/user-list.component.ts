import { Component, OnInit } from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { UserService } from '../../../../core/services/user.service';
import { Role } from '../../../../core/models/enums';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  loading = true;

  // Filters
  searchTerm = '';
  selectedRole = '';
  selectedStatus = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.users = response.data;
          this.filteredUsers = [...this.users];
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.loading = false;
        // Demo data for development
        this.users = [
          {
            id: 1,
            username: 'admin',
            email: 'admin@nirmaan.com',
            firstName: 'System',
            lastName: 'Admin',
            role: Role.ADMIN,
            active: true,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
          },
          {
            id: 2,
            username: 'john.trainer',
            email: 'john@nirmaan.com',
            firstName: 'John',
            lastName: 'Smith',
            role: Role.TRAINER,
            phoneNumber: '+1234567890',
            active: true,
            createdAt: new Date('2024-01-15'),
            updatedAt: new Date('2024-01-15'),
          },
          {
            id: 3,
            username: 'jane.student',
            email: 'jane@student.com',
            firstName: 'Jane',
            lastName: 'Doe',
            role: Role.STUDENT,
            phoneNumber: '+1234567891',
            active: true,
            createdAt: new Date('2024-02-01'),
            updatedAt: new Date('2024-02-01'),
          },
        ];
        this.filteredUsers = [...this.users];
      },
    });
  }

  applyFilters(): void {
    this.filteredUsers = this.users.filter((user) => {
      const matchesSearch =
        !this.searchTerm ||
        user.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesRole = !this.selectedRole || user.role === this.selectedRole;

      const matchesStatus =
        !this.selectedStatus || user.active.toString() === this.selectedStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }

  getRoleBadgeClass(role: Role): string {
    switch (role) {
      case Role.ADMIN:
        return 'bg-red-100 text-red-800';
      case Role.TRAINER:
        return 'bg-blue-100 text-blue-800';
      case Role.STUDENT:
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  toggleUserStatus(user: User): void {
    const updatedUser = { ...user, active: !user.active };

    this.userService
      .updateUser(user.id, { active: updatedUser.active })
      .subscribe({
        next: (response) => {
          if (response.success) {
            const index = this.users.findIndex((u) => u.id === user.id);
            if (index !== -1) {
              this.users[index] = {
                ...this.users[index],
                active: updatedUser.active,
              };
              this.applyFilters();
            }
          }
        },
        error: (error) => {
          console.error('Error updating user status:', error);
          alert('Failed to update user status');
        },
      });
  }

  deleteUser(user: User): void {
    if (
      confirm(
        `Are you sure you want to delete ${user.firstName} ${user.lastName}?`
      )
    ) {
      this.userService.deleteUser(user.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.users = this.users.filter((u) => u.id !== user.id);
            this.applyFilters();
          }
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          alert('Failed to delete user');
        },
      });
    }
  }
}
