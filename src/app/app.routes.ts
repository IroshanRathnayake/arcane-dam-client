import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { ProjectDetailsComponent } from './features/projects/components/project-details/project-details.component';
import { OverviewComponent } from './features/dashboard/overview/overview.component';
import { BoardComponent } from './features/board/board.component';
import { AssetDetailsComponent } from './features/assets/components/asset-details/asset-details.component';
import { AssetListComponent } from './features/assets/components/asset-list/asset-list.component';
import { DashboardBaseComponent } from './features/dashboard/dashboard-base/dashboard-base.component';
import { AssetsBaseComponent } from './features/assets/components/assets-base/assets-base.component';
import { OtpComponent } from './features/auth/otp/otp.component';
import { AccessDeniedComponent } from './shared/components/exception-pages/access-denied/access-denied.component';
import { NotFoundComponent } from './shared/components/exception-pages/not-found/not-found.component';
import { RoleGuard } from './core/guards/role.guard';

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
    path: 'auth/verify',
    component: OtpComponent
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: DashboardBaseComponent,
        children:[
          {
            path: '',
            component: OverviewComponent
          },
          {
            path: 'projects',
            component: ProjectDetailsComponent,
            canActivate: [RoleGuard],
            data: { role: 'admin' }
          },
          {
            path: 'board',
            component: BoardComponent
          },
        ]
      },
      {
        path: 'assets',
        component: AssetsBaseComponent
      }
     
    ]
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];