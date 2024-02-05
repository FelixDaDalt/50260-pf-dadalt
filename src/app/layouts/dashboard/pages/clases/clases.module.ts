import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClasesComponent } from './clases.component';
import { ClaseFormularioComponent } from './componentes/clase-formulario/clase-formulario.component';
import { CompartidosModule } from '../../../../compartidos/compartidos.module';




@NgModule({
  declarations: [
    ClasesComponent,
    ClaseFormularioComponent
  ],
  imports: [
    CommonModule,
    CompartidosModule
  ],
  exports:[
    ClasesComponent,
    ClaseFormularioComponent
  ]
})
export class ClasesModule { }
