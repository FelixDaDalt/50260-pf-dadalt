import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './dashboard.component';


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
        loadChildren: () =>
              import('./pages/cursos/cursos.module').then(
                (m) => m.CursosModule
              ),
      },
      {
        path: 'clases', // /dashboard/clases
        loadChildren: () =>
              import('./pages/clases/clases.module').then(
                (m) => m.ClasesModule
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
