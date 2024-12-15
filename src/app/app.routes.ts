import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { adminAndLoginGuard } from './auth/adminAndLoginGuard.guard';
import { authguardGuard } from './auth/authguard.guard';
import { isloginguardGuard } from './auth/isloginguard.guard';

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
    component: UserListComponent,
    title: 'Smart Admin - Users list',
    canActivate: [isloginguardGuard],
  },
  {
    path: 'users/edit-user',
    component: EditUserComponent,
    title: 'Smart Admin - Edit panel',
    canActivate: [adminAndLoginGuard],
  },
  {
    path: 'users/add-user',
    component: AddUserComponent,
    title: 'Smart Admin - Add panel',
    canActivate: [adminAndLoginGuard],
  },
];
