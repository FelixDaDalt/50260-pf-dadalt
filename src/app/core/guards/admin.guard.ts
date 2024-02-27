import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../layouts/auth/auth.service';
import { inject } from '@angular/core';
import { map, skip } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../compartidos/dialog/dialog.component';
import { Store } from '@ngrx/store';
import { selectorUsuario } from '../store/auth/selector';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const store = inject(Store)
  const dialog = inject(MatDialog)

  return store.select(selectorUsuario).pipe(
    map((usuario)=>{
     if(usuario?.rol.id==1){
      return true
     }else{
      const dialogRef = dialog.open(DialogComponent, {
        data: {titulo: 'Error', contenido: 'No tiene permisos para acceder'},
      });
      return router.createUrlTree(['/dashboard', 'alumnos'])
     }
    })
  )
}
