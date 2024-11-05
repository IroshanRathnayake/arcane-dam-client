import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: User | null = null;
  isLoading = false;
  error = '';

  constructor(private authService: AuthService, private http: HttpClient,  private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4)]],
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    });
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.isLoading = true;

    const token = localStorage.getItem('token');
    console.log(token);
    
    // const headers = new HttpHeaders({
    //   'Content-Type':'Application/json',
    //   'Authorization':'Bearer ' + token
    // });

    // this.http.get("http://localhost:8083/user/all").subscribe({
    //   next: (data) => console.log(data),
    //   error: (error) => console.error('Error:', error)
    // });
  }

  onSubmit(): void {}
}
