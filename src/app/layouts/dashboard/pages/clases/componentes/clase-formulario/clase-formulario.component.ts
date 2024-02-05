import { CursosService } from './../../../cursos/cursos.service';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { curso } from '../../../cursos/modelos/curso';
import { clase } from '../../modelos/clase';
import { ClasesService } from '../../clases.service';

@Component({
  selector: 'app-clase-formulario',
  templateUrl: './clase-formulario.component.html',
  styleUrl: './clase-formulario.component.scss'
})
export class ClaseFormularioComponent {
  diasCursada:string[]=['Lunes','Martes','Miercoles','Jueves','Viernes','Sabados','Domingo']
  formulario!: FormGroup


  @Output() nuevaClase = new EventEmitter()
  @Input() actualizarClase!:clase | null

  constructor(private fb:FormBuilder, private claseService:ClasesService, private cursosService:CursosService){
      this.formulario = this.fb.group({
      id:[],
      nombre: ['', Validators.required],
      diasCursada: ['', Validators.required],
      horaInicio: ['', [Validators.required]],
      horaFin: ['', Validators.required],
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['',Validators.required],
      docente: ['',Validators.required]
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['actualizarClase'] && this.actualizarClase) {
      this.formulario.patchValue(this.actualizarClase);
    }
  }


  enviar(){
    const nuevaClase = this.formulario.value
    this.nuevaClase.emit(nuevaClase)
    this.formulario.reset()
  }

  cancelar(){
    this.formulario.reset()
    this.nuevaClase.emit()
  }
}
