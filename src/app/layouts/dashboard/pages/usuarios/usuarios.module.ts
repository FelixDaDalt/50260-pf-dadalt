import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompartidosModule } from '../../../../compartidos/compartidos.module';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuarioFormularioComponent } from './componentes/usuario-formulario/usuario-formulario.component';



@NgModule({
  declarations: [
    UsuariosComponent,
    UsuarioFormularioComponent
    //AlumnoVerComponent
  ],
  imports: [
    CommonModule,
    CompartidosModule,
    UsuariosRoutingModule
  ],
  exports:[
    UsuariosComponent,
    UsuarioFormularioComponent
  ]
})
export class UsuariosModule { }
