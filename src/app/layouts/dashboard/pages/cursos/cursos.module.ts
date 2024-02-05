import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompartidosModule } from '../../../../compartidos/compartidos.module';
import { CursosComponent } from './cursos.component';
import { CursoFormularioComponent } from './componentes/curso-formulario/curso-formulario.component';
import { CursoVerComponent } from './componentes/curso-ver/curso-ver.component';
import { CursosRoutingModule } from './cursos-routing.module';


@NgModule({
    declarations: [
        CursosComponent,
        CursoFormularioComponent,
        CursoVerComponent
    ],
    imports: [
      CommonModule,
      CompartidosModule,
      CursosRoutingModule
    ],
    exports: [
      CursosComponent
    ]
})
export class CursosModule { }
