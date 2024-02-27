import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { usuario } from '../../../../../auth/modelos/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../usuarios.service';

@Component({
  selector: 'app-usuario-formulario',
  templateUrl: './usuario-formulario.component.html',
  styleUrl: './usuario-formulario.component.scss'
})
export class UsuarioFormularioComponent {

  formulario!: FormGroup
  roles=[{id:1,rol:'Administrador'},{id:2,rol:'Inscripciones'}]
  usuario:usuario[]=[]


  @Output() nuevoUsuario = new EventEmitter()
  @Input() actualizarUsuario!:usuario | null

  constructor(private fb:FormBuilder, private usuarioService:UsuariosService){
      this.formulario = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rol: [null, Validators.required],
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['actualizarUsuario'] && this.actualizarUsuario) {
      this.formulario.patchValue(this.actualizarUsuario);
    }
  }



  enviar(){
    let nuevoUsuario = this.formulario.value
    if(this.actualizarUsuario){
      nuevoUsuario.id= this.actualizarUsuario.id
    }
    this.nuevoUsuario.emit(nuevoUsuario)
    this.formulario.reset()
  }

  cancelar(){
    this.actualizarUsuario = null
    this.formulario.reset()
    this.nuevoUsuario.emit()
  }

  compareRoles(role1: any, role2: any): boolean {
    return role1 && role2 ? role1.id === role2.id : role1 === role2;
  }

}

