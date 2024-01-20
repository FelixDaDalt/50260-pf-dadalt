import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import { AlumnosComponent } from './alumnos.component';
import { AlumnoFormularioComponent } from './componentes/alumno-formulario/alumno-formulario.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CompartidosModule } from '../../../../compartidos/compartidos.module';

@NgModule({
  declarations: [
    AlumnosComponent,
    AlumnoFormularioComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatExpansionModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    CompartidosModule,
  ],
  exports:[
    AlumnosComponent,
    AlumnoFormularioComponent
  ]
})
export class AlumnosModule { }
