import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { AlumnosModule } from './pages/alumnos/alumnos.module';
import { CompartidosModule } from '../../compartidos/compartidos.module';
import {MatTreeModule} from '@angular/material/tree';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    AlumnosModule,
    CompartidosModule,
    MatTreeModule,
    MatButtonModule
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
