import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { map } from 'rxjs';

export const adminguardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.isUserLoggedIn().pipe(
    map((isLoggedIn) => {
      if (isLoggedIn) {
        router.navigate(['']);
        return false;
      }
      return true;
    })
  );
};
