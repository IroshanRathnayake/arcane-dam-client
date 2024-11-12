import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { ProjectDetailsComponent } from './features/projects/components/project-details/project-details.component';
import { OverviewComponent } from './features/dashboard/overview/overview.component';
import { BoardComponent } from './features/board/board.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: OverviewComponent
      },
      {
        path: 'projects',
        component: ProjectDetailsComponent
      },
      {
        path: 'board',
        component: BoardComponent
      }
     
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];