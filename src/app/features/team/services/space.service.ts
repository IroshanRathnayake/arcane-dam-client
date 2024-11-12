import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, tap } from 'rxjs';
import { User } from '../../../core/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Space } from '../models/space';
import { AuthService } from '../../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SpaceService {

  private readonly API_URL = `http://localhost:8083/api/v1/user`;
  private user: User | null = null;
  private spaceComponentASubject = new Subject<void>();
  spaceComponentA$ = this.spaceComponentASubject.asObservable();

 
  constructor(private http: HttpClient, private authService: AuthService) { }
  

  async updateSpace(updatedSpace: Space): Promise<Observable<User>> {
    
    this.user = this.authService.getCurrentUser();
    if(!this.user){ 
      throw new Error('User not found');
    }
  
    return this.http.put<User>(`${this.API_URL}/${this.user?.id}/spaces`, updatedSpace, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }).pipe(
      tap(response => {
        localStorage.setItem('spaces', JSON.stringify(response.spaces));
      }),
      catchError(error => {
        console.error('Error updating space:', error);
        throw error;
      })
    );
  }

  triggerInitComponentA() {
    this.spaceComponentASubject.next();
  }
}
