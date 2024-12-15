import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { map } from 'rxjs';

export const adminAndLoginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.isLoggedInAndAdmin().pipe(
    map((isAdminAndLoggedIn) => {
      if (isAdminAndLoggedIn) {
        return true;
      }
      router.navigate(['']);
      return false;
    })
  );
};
