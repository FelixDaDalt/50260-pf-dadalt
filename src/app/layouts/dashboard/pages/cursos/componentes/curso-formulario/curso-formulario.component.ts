import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { curso } from '../../modelos/curso';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      id:[],
      nombre: ['', Validators.required],
      alumnos: [],
    });


  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['actualizarCurso'] && this.actualizarCurso) {
      this.formulario.patchValue(this.actualizarCurso);
    }
  }

  enviar(){
    const nuevoCurso = this.formulario.value
    this.nuevoCurso.emit(nuevoCurso)
    this.formulario.reset()
  }

  cancelar(){
    this.formulario.reset()
    this.nuevoCurso.emit()
  }
}
