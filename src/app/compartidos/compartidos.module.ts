import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NombreCompletoPipe } from './pipes/nombre-completo.pipe';
import { TituloDirective } from './directive/titulo.directive';



@NgModule({
  declarations: [NombreCompletoPipe, TituloDirective],
  imports: [
    CommonModule
  ],
  exports:[NombreCompletoPipe,
  TituloDirective]
})
export class CompartidosModule { }
