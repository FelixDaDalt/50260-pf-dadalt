import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClasesComponent } from './clases.component';
import { ClaseFormularioComponent } from './componentes/clase-formulario/clase-formulario.component';
import { CompartidosModule } from '../../../../compartidos/compartidos.module';
import { ClasesVerComponent } from './componentes/clases-ver/clases-ver.component';
import { ClasesRoutingModule } from './clases-routing.module';


@NgModule({
  declarations: [
    ClasesComponent,
    ClaseFormularioComponent,
    ClasesVerComponent
  ],
  imports: [
    CommonModule,
    CompartidosModule,
    ClasesRoutingModule
  ],
  exports:[
    ClasesComponent,
    ClaseFormularioComponent
  ]
})
export class ClasesModule { }
