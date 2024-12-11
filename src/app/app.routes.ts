import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { authguardGuard } from './auth/authguard.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [authguardGuard],
        title: 'SmartAdmin - Log in'
    }
];
