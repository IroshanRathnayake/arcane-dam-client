import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User, AuthResponse } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private readonly API_URL = `http://localhost:8083`;

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  test(): Observable<any> {
    return this.http
      .get(`${this.API_URL}/test`)
      .pipe(tap((response) => console.log(response)));
  }

  login(email: string, password: string): Observable<string> {
    return this.http
      .post<string>(
        `${this.API_URL}/login`,
        { email, password },
        {
          responseType: 'text' as 'json',
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response);
        })
      );
  }

  googleAuth(): void {
    window.location.href = 'http://localhost:8083/oauth2/authorization/google';
    this.http
      .get('http://localhost:8083/oauth2/authorization/google')
      .subscribe((data) => console.log(data));
  }

  githubAuth(): void {
    window.location.href = 'http://localhost:8083/oauth2/authorization/github';
  }

  register(user: Omit<User, 'id'>): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, user).pipe(
      tap((response) => {
        localStorage.setItem('token', response.accessToken);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
