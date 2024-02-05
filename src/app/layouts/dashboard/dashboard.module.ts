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
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CursosModule } from './pages/cursos/cursos.module';
import { ClasesModule } from './pages/clases/clases.module';


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    CompartidosModule,
    MatTreeModule,
    MatButtonModule,
    DashboardRoutingModule
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
