import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { adminAndLoginGuard } from './auth/adminAndLoginGuard.guard';
import { authguardGuard } from './auth/authguard.guard';
import { isloginguardGuard } from './auth/isloginguard.guard';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { WrongPathComponent } from './wrong-path/wrong-path.component';

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
  {
    path: "products/list",
    component: ProductListComponent,
    title: 'Smart Admin - Products list',
    canActivate: [isloginguardGuard]

  },{
    path: "products/add-product",
    component: AddProductComponent,
    title: 'Smart Admin - Add product',
    canActivate: [adminAndLoginGuard]
  },
  {
    path: "products/edit-product",
    component: EditProductComponent,
    title: 'Smart Admin - Edit product',
    canActivate: [adminAndLoginGuard]
  }, 
  {
    path: '**',
    component: WrongPathComponent,
    title: 'Oops :(',

  }
];
