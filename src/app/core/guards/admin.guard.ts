import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../layouts/auth/auth.service';
import { inject } from '@angular/core';
import { map, skip } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../compartidos/dialog/dialog.component';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authUserService = inject(AuthService)
  const dialog = inject(MatDialog)
  return authUserService.obtenerUsuario().pipe(
    map(usuario => {
      if (usuario && usuario.rol.id == 1) {
        return true; // Permite la navegación
      } else if(usuario!=null){
        const dialogRef = dialog.open(DialogComponent, {
          data: {titulo: 'Error', contenido: 'No tiene permisos para acceder'},
        });
        return router.createUrlTree(['/dashboard', 'alumnos']); // Redirige a otra URL
      }else{
        return router.createUrlTree(['/dashboard', 'alumnos']); // Redirige a otra URL
      }
    }),
  )
};
