import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { CompartidosModule } from '../../compartidos/compartidos.module';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    CompartidosModule,
    authRoutingModule
  ]
})
export class AuthModule { }
