import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { TaskboardComponent } from './features/taskboard/taskboard.component';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: TaskboardComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];