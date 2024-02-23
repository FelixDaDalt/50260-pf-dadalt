import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './alumnos.component';
import { AlumnoVerComponent } from './componentes/alumno-ver/alumno-ver.component';

const routes: Routes = [
  {
    path: '',
    component: AlumnosComponent,
  },
  {
    path: 'ver',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'ver/:id',
    component: AlumnoVerComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class AlumnosRoutingModule { }
