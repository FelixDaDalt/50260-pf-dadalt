import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosComponent } from './alumnos.component';
import { AlumnoFormularioComponent } from './componentes/alumno-formulario/alumno-formulario.component';
import { CompartidosModule } from '../../../../compartidos/compartidos.module';
import { AlumnoVerComponent } from './componentes/alumno-ver/alumno-ver.component';
import { AlumnosRoutingModule } from './alumnos-routing.module';



@NgModule({
  declarations: [
    AlumnosComponent,
    AlumnoFormularioComponent,
    AlumnoVerComponent
  ],
  imports: [
    CommonModule,
    CompartidosModule,
    AlumnosRoutingModule
  ],
  exports:[
    AlumnosComponent,
    AlumnoFormularioComponent
  ]
})
export class AlumnosModule { }
