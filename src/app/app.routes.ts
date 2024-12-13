import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { authguardGuard } from './auth/authguard.guard';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './users/user-list/user-list.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Smart Admin - Home',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authguardGuard],
    title: 'Smart Admin - Log in',
  },
  {
    path: 'users/list',
    component: UserListComponent
  }
];
