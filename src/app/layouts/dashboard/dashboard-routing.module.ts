import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './dashboard.component';
import { adminGuard } from '../../core/guards/admin.guard';


const dashboardRoutes: Routes = [
  {
    path: '', // /dashboard
    component: DashboardComponent,
    children: [
      {
        path: '', // /dashboard/home (si no hay nada después de /)
        component: HomeComponent,
      },
      {
        path: 'alumnos', // /dashboard/alumnos
        loadChildren: () =>
              import('./pages/alumnos/alumnos.module').then(
                (m) => m.AlumnosModule
              ),
      },
      {
        path: 'cursos', // /dashboard/cursos
        canActivate:[adminGuard],
        loadChildren: () =>
              import('./pages/cursos/cursos.module').then(
                (m) => m.CursosModule
              ),
      },
      {
        path: 'clases', // /dashboard/clases
        canActivate:[adminGuard],
        loadChildren: () =>
              import('./pages/clases/clases.module').then(
                (m) => m.ClasesModule
              ),
      },
      {
        path: 'usuarios', // /dashboard/usuarios
        canActivate:[adminGuard],
        loadChildren: () =>
              import('./pages/usuarios/usuarios.module').then(
                (m) => m.UsuariosModule
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
