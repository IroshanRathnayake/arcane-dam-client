import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { TaskboardComponent } from './features/taskboard/taskboard.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component')
      .then(m => m.RegisterComponent)
  },
  {
    path: 'home',
    component: DashboardComponent
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: TaskboardComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];