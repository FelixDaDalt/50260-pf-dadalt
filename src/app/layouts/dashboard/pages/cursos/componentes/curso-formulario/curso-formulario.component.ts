import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { curso } from '../../modelos/curso';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClasesService } from '../../../clases/clases.service';
import { clase } from '../../../clases/modelos/clase';

@Component({
  selector: 'app-curso-formulario',
  templateUrl: './curso-formulario.component.html',
  styleUrl: './curso-formulario.component.scss'
})
export class CursoFormularioComponent {

  formulario!: FormGroup
  niveles=['inicial','primario','secundario','terciario']
  clases:clase[]=[]

  @Output() nuevoCurso = new EventEmitter()
  @Input() actualizarCurso!:curso | null

  constructor(private fb:FormBuilder, private clasesService:ClasesService){
      this.formulario = this.fb.group({
      id:[],
      nombre: ['', Validators.required],
      clases:['',Validators.required],
      alumnos: [],
    });

    this.obtenerClases()

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['actualizarCurso'] && this.actualizarCurso) {
      this.formulario.patchValue(this.actualizarCurso);
    }
  }

  private obtenerClases(){
    this.clasesService.obtenerClases().subscribe({
      next:(clases)=>{
        this.clases = clases
      }
    })
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
