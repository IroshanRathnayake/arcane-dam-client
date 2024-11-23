import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const userRoles = this.authService.getCurrentUser()?.role;
    const requiredRole = route.data['role'];

    if (userRoles && userRoles.includes(requiredRole)) {
      return true;
    } else {
      this.router.navigate(['/access-denied']);
      return false;
    }
  }
}
