import { Alumno } from '../../modelos/alumno';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { CursosService } from '../../../cursos/cursos.service';
import { curso } from '../../../cursos/modelos/curso';


@Component({
  selector: 'app-alumno-formulario',
  templateUrl: './alumno-formulario.component.html',
  styleUrl: './alumno-formulario.component.scss'
})
export class AlumnoFormularioComponent implements OnChanges {

  formulario!: FormGroup
  niveles=['inicial','primario','secundario','terciario']
  cursos:curso[]=[]

  @Output() nuevoAlumno = new EventEmitter()
  @Input() actualizarAlumno!:Alumno | null

  constructor(private fb:FormBuilder, private cursosService:CursosService){
      this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', [Validators.required, Validators.pattern('^[0-9]*$'),Validators.min(8)]],
      telefono: ['', [Validators.pattern('^[0-9]*$')]],
      direccion:[''],
      curso_id: [''],
    });

    this.obtenerCursos()

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['actualizarAlumno'] && this.actualizarAlumno) {
      this.formulario.patchValue(this.actualizarAlumno);
    }
  }

  private obtenerCursos(){
    this.cursosService.suscripcionCursos().subscribe({
      next:(cursos)=>{
        this.cursos = cursos
      }
    })
  }

  enviar(){
    let nuevoAlumno = this.formulario.value
    if(this.actualizarAlumno){
      nuevoAlumno.id= this.actualizarAlumno.id
    }
    this.nuevoAlumno.emit(nuevoAlumno)
    this.formulario.reset()
  }

  cancelar(){
    this.formulario.reset()
    this.nuevoAlumno.emit()
  }

}
