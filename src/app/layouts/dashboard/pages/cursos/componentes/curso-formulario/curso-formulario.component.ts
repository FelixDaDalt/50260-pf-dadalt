import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { curso } from '../../modelos/curso';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-curso-formulario',
  templateUrl: './curso-formulario.component.html',
  styleUrl: './curso-formulario.component.scss'
})
export class CursoFormularioComponent {

  formulario!: FormGroup
  niveles=['inicial','primario','secundario','terciario']


  @Output() nuevoCurso = new EventEmitter()
  @Input() actualizarCurso!:curso | null

  constructor(private fb:FormBuilder){
      this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      profesor: [[], Validators.required],
      horaInicio: [[], Validators.required],
      horaFin: [[], Validators.required],
      fechaInicio: [[], Validators.required],
      fechaFin: [[], Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['actualizarCurso'] && this.actualizarCurso) {
      this.formulario.patchValue(this.actualizarCurso);
    }
  }


  enviar(){
    const nuevoCurso:curso = this.formulario.value
    if(this.actualizarCurso){
      nuevoCurso.id= this.actualizarCurso.id
    }
    this.nuevoCurso.emit(nuevoCurso)
    this.formulario.reset()
  }

  cancelar(){
    this.formulario.reset()
    this.nuevoCurso.emit()
  }

}
