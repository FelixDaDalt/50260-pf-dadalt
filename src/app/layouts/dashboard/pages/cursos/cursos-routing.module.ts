import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './cursos.component';
import { CursoVerComponent } from './componentes/curso-ver/curso-ver.component';

const routes: Routes = [
  {
    path: '',
    component: CursosComponent,
  },
  {
    path: 'ver',
    component: CursosComponent,
  },
  {

    path: 'ver/:id',
    component: CursoVerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class CursosRoutingModule { }
