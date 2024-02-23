import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../layouts/auth/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authUserService = inject(AuthService)

  return authUserService
    .verificarToken()
    .pipe(
      map((autenticado)=>
        autenticado?true:router.createUrlTree(['auth']))
    )
};
