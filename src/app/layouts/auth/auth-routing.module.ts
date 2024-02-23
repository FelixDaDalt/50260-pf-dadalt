import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';


const authRoutes: Routes = [
  {
    path: '', // /dashboard
    component: LoginComponent,
    children: [
      {
        path: 'login', // /dashboard/home (si no hay nada después de /)
        component: LoginComponent,
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule]
})
export class authRoutingModule { }
