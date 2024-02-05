import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { DashboardComponent } from './dashboard.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { ClasesComponent } from './pages/clases/clases.component';


const dashboardRoutes: Routes = [
  {
    path: '', // /dashboard
    component: DashboardComponent,
    children: [
      {
        path: '', // /dashboard (si no hay nada después de /)
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
        loadChildren: () =>
              import('./pages/cursos/cursos.module').then(
                (m) => m.CursosModule
              ),
      },
      {
        path: 'clases', // /dashboard/clases
        component: ClasesComponent,
      },
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
