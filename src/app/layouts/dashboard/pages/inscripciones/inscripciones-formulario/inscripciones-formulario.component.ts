import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs';
import { Alumno } from '../../alumnos/modelos/alumno';
import { seleccionarAlumnos, seleccionarCursos } from '../store/inscripcion.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InscripcionActions } from '../store/inscripcion.actions';
import { curso } from '../../cursos/modelos/curso';
import { inscripcion } from '../modelo/inscripcion';

@Component({
  selector: 'app-inscripciones-formulario',
  templateUrl: './inscripciones-formulario.component.html',
  styleUrl: './inscripciones-formulario.component.scss'
})
export class InscripcionesFormularioComponent{

  formulario!: FormGroup;
  alumnos$!: Observable<Alumno[]>;
  cursos$!:Observable<curso[]>;

  @Output() nuevaInscripcion= new EventEmitter()
  @Input() actualizarInscripcion!:inscripcion | null

  constructor(private store: Store, private fb: FormBuilder) {
    this.store.dispatch(InscripcionActions.cargarAlumnos())
    this.store.dispatch(InscripcionActions.cargarCursos())

    this.formulario = this.fb.group({
      alumnoId: ['', Validators.required],
      cursoId: ['', Validators.required],
    });

    this.getAlumnos();
    this.getCursos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['actualizarInscripcion'] && this.actualizarInscripcion) {
      this.formulario.patchValue(this.actualizarInscripcion);
    }
  }

  private getAlumnos() {
    this.alumnos$ = this.store.select(seleccionarAlumnos);
  }

  private getCursos(){
    this.cursos$ = this.store.select(seleccionarCursos)
  }


  enviar(){
    const nuevaInscripcion = this.formulario.value
    if(this.actualizarInscripcion){
      nuevaInscripcion.id= this.actualizarInscripcion.id
    }
    this.nuevaInscripcion.emit(nuevaInscripcion)
    this.formulario.reset()
  }

  cancelar(){
    this.formulario.reset()
    this.nuevaInscripcion.emit()
  }

}
