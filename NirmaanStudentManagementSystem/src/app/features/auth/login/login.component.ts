import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = '';
      
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.success) {
            const user = this.authService.getCurrentUser();
            switch (user?.role) {
              case 'ADMIN':
                this.router.navigate(['/dashboard/admin']);
                break;
              case 'TRAINER':
                this.router.navigate(['/dashboard/trainer']);
                break;
              case 'STUDENT':
                this.router.navigate(['/dashboard/student']);
                break;
              default:
                this.router.navigate(['/dashboard']);
            }
          }
        },
        error: (error) => {
          this.error = error.error?.message || 'Login failed';
          this.loading = false;
        }
      });
    }
  }
}