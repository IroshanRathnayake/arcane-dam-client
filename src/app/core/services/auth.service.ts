import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User, AuthResponse } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';
import { Space } from '../../features/team/models/space';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private readonly API_URL = `${environment.BASE_URL}/api/auth`;

  constructor(private http: HttpClient, private router: Router) {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const parsedUser: AuthResponse = JSON.parse(savedUser);
      this.currentUserSubject.next(parsedUser.user);
    }
  }

  test(): Observable<any> {
    return this.http
      .get(`${this.API_URL}/test`)
      .pipe(tap((response) => console.log(response)));
  }

  async login(email: string, password: string): Promise<Observable<AuthResponse>> {
    return this.http
      .post<AuthResponse>(
        `${this.API_URL}/login`,
        { email, password },
        {
          responseType: 'json',
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(
        tap((response) => {
          Cookies.set('token', response.token, { expires: 1 / 24 });
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('spaces', JSON.stringify(response.user.spaces));
          this.currentUserSubject.next(response.user);
          sessionStorage.setItem('oneTimeData', 'false');
        })
      );
  }

  googleAuth(): void {
    window.location.href = 'http://localhost:8083/oauth2/authorization/google';
  }

  githubAuth(): void {
    window.location.href = 'http://localhost:8083/oauth2/authorization/github';
  }

  async register(user: User): Promise<Observable<AuthResponse>> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/register`, user, {
        responseType: 'json',
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        tap((response) => {
          localStorage.setItem('tempUser', JSON.stringify(response));
        })
      );
  }

  async verifyOtp(otp: string): Promise<Observable<AuthResponse>> {
    const userName = this.getTempUser()?.email;
    return this.http
      .post<AuthResponse>(`${this.API_URL}/verify`, { userName, otp }, {
        responseType: 'json',
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        tap((response) => {
          this.router.navigate(['auth/login']);
        })
      );
  }
  
  logout(): void {
    Cookies.remove('token');
    localStorage.removeItem('user');
    localStorage.removeItem('spaces');
    this.currentUserSubject.next(null);
    sessionStorage.setItem('oneTimeData', 'false');
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    // return localStorage.getItem('token');
    return Cookies.get('token') || null;
  }

  getCurrentUser(): User | null {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser: User = JSON.parse(savedUser);
      return parsedUser;
    }
    return null;
  }

  getTempUser(): User | null{
    const savedUser = localStorage.getItem('tempUser');
    if (savedUser) {
      const parsedUser: User = JSON.parse(savedUser);
      return parsedUser;
    }
    return null;
  }

  getSpaces(): Space[] | null {
    const savedSpaces = localStorage.getItem('spaces');
    if (savedSpaces) {
      const parsedSpaces: Space[] = JSON.parse(savedSpaces);
      return parsedSpaces;
    }
    return null;
  }

  getCurrentSpaceID(): any | null {
    const spaceIndexStr = localStorage.getItem('selectedSpaceIndex');
    const spacesStr = localStorage.getItem('spaces');

    if (spaceIndexStr && spacesStr) {
      const spaceIndex = parseInt(spaceIndexStr, 10);
      const spaces = JSON.parse(spacesStr);

      if (
        Array.isArray(spaces) &&
        spaceIndex >= 0 &&
        spaceIndex < spaces.length
      ) {
        var spaceId = spaces[spaceIndex].id;
        return spaceId;
      } else {
        console.error('Invalid space index or spaces array is empty.');
      }
    } else {
      console.error('spaceId or spaces is missing in localStorage.');
    }
  }
}
