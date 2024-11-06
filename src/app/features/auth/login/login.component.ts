import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  error = '';
  isLoggedIn = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.error = '';

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.isLoading = false; ``
        console.log('Login successful');
        this.isLoggedIn = true;
        this.router.navigate(['dashboard']);
        setTimeout(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login Successful",
            showConfirmButton: false,
            timer: 1500
          });
        }, 3500);
      },
      error: (error) => {
        this.isLoading = false;
        this.error = error.error.message || 'An error occurred during login';

        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded",
          },
          buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
          title: "Login Failed",
          text: this.error,
          icon: "error",
        });
      }
    });
  }

  googleLogin(): void {
    this.authService.googleAuth();
  }

  githubLogin(): void {
    this.authService.githubAuth();
  }
}