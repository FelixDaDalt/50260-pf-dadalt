import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { InscripcionEffects } from './store/inscripcion.effects';
import { StoreModule } from '@ngrx/store';
import { inscripcionFeature } from './store/inscripcion.reducer';
import { InscripcionesFormularioComponent } from './inscripciones-formulario/inscripciones-formulario.component';
import { InscripcionesComponent } from './inscripciones.component';
import { CompartidosModule } from '../../../../compartidos/compartidos.module';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';



@NgModule({
  declarations: [
    InscripcionesComponent,
    InscripcionesFormularioComponent
  ],
  imports: [
    CommonModule,
    CompartidosModule,
    InscripcionesRoutingModule,
    StoreModule.forFeature(inscripcionFeature),
    EffectsModule.forFeature([InscripcionEffects])
  ],
  exports:[
    InscripcionesComponent
  ]
})
export class InscripcionesModule { }
