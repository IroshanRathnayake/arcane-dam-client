import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Alert, AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent implements OnInit{
  otpForm: FormGroup;
  alerts: Alert[] = [];
  isLoading = false;
  isResending = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private alertService: AlertService) {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.alertService.alert$.subscribe((alerts) => {
      this.alerts = alerts;
    });
  }

  async onSubmit() {
    if (this.otpForm.valid) {
      this.isLoading = true;
      const otp = this.otpForm.get('otp')?.value;
  
      (await this.authService.verifyOtp(otp)).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.router.navigate(['auth/login']);
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
          if (err?.status === 401) {
            this.error = 'Unauthorized: Invalid OTP or email.';
            this.alertService.showAlert('error', this.error);
          } else if (err?.status === 400) {
            this.error = 'Bad Request: Please check the OTP.';
          } else {
            this.error = err?.error?.message || 'An error occurred during verification.';
          }
        },
        complete: () => {
          console.log('OTP verification process complete.');
        }
      });
    }
  }
  

  resendOTP() {
    this.isResending = true;
    setTimeout(() => {
      this.isResending = false;
      alert('OTP resent successfully!');
    }, 2000);
  }

}
