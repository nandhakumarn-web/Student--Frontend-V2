import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { Router } from 'express';
import { ActivatedRoute } from '@angular/router';
import { User, UserRegistrationRequest } from '../../../../core/models/user.model';
import { CourseType, Role } from '../../../../core/models/enums';

@Component({
  selector: 'app-user-form',
  imports: [],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  loading = false;
  errorMessage = '';
  isEditMode = false;
  userId: number | null = null;
  selectedRole = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.checkEditMode();
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      role: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      
      // Student specific fields
      dateOfBirth: [''],
      address: [''],
      emergencyContact: [''],
      enrolledCourse: [''],
      qualification: [''],
      
      // Trainer specific fields
      specialization: [''],
      qualifications: [''],
      experienceYears: [0],
      certification: ['']
    });
  }

  checkEditMode(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.userId = +id;
      this.loadUser();
      // Remove password requirement for edit mode
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
    }
  }

  loadUser(): void {
    if (this.userId) {
      this.loading = true;
      this.userService.getUserById(this.userId).subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.populateForm(response.data);
          }
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load user data';
          this.loading = false;
        }
      });
    }
  }

  populateForm(user: User): void {
    this.selectedRole = user.role;
    this.userForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role
    });
  }

  onRoleChange(): void {
    this.selectedRole = this.userForm.get('role')?.value;
    
    // Reset role-specific fields
    const studentFields = ['dateOfBirth', 'address', 'emergencyContact', 'enrolledCourse', 'qualification'];
    const trainerFields = ['specialization', 'qualifications', 'experienceYears', 'certification'];
    
    [...studentFields, ...trainerFields].forEach(field => {
      this.userForm.get(field)?.setValue('');
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      const formData = this.userForm.value;
      
      // Clean up form data based on role
      const userData: UserRegistrationRequest = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        role: formData.role as Role,
        phoneNumber: formData.phoneNumber || undefined,
        password: ''
      };

      if (!this.isEditMode) {
        userData.password = formData.password;
      }

      // Add role-specific data
      if (formData.role === 'STUDENT') {
        userData.dateOfBirth = formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined;
        userData.address = formData.address || undefined;
        userData.emergencyContact = formData.emergencyContact || undefined;
        userData.enrolledCourse = formData.enrolledCourse as CourseType || undefined;
        userData.qualification = formData.qualification || undefined;
      } else if (formData.role === 'TRAINER') {
        userData.specialization = formData.specialization || undefined;
        userData.qualifications = formData.qualifications || undefined;
        userData.experienceYears = formData.experienceYears || undefined;
        userData.certification = formData.certification || undefined;
      }

      const request = this.isEditMode 
        ? this.userService.updateUser(this.userId!, userData)
        : this.userService.createUser(userData);

      request.subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate(['/admin/users']);
          }
        },
        error: (error) => {
          this.errorMessage = error.error?.message || `Failed to ${this.isEditMode ? 'update' : 'create'} user`;
          this.loading = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.userForm.controls).forEach(key => {
      this.userForm.get(key)?.markAsTouched();
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/users']);
  }
}