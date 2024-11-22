import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {
  otpForm: FormGroup;
  isLoading = false;
  isResending = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.otpForm.valid) {
      this.isLoading = true;
      const otp = this.otpForm.get('otp')?.value;
      setTimeout(() => {
        this.isLoading = false;
        alert('OTP verified successfully!');
        this.router.navigate(['/dashboard']); 
      }, 2000);
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
