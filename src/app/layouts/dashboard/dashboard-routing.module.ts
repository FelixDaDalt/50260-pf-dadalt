import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './dashboard.component';
import { adminGuard } from '../../core/guards/admin.guard';


const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'alumnos',
        loadChildren: () =>
              import('./pages/alumnos/alumnos.module').then(
                (m) => m.AlumnosModule
              ),
      },
      {
        path: 'cursos',
        loadChildren: () =>
              import('./pages/cursos/cursos.module').then(
                (m) => m.CursosModule
              ),
      },
      {
        path: 'usuarios',
        canActivate:[adminGuard],
        loadChildren: () =>
              import('./pages/usuarios/usuarios.module').then(
                (m) => m.UsuariosModule
              ),
      },
      {
        path: 'Inscripciones',
        loadChildren: () =>
              import('./pages/inscripciones/inscripciones.module').then(
                (m) => m.InscripcionesModule
              ),
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
