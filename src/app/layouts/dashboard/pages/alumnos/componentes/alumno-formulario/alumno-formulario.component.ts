import { Alumno } from './../../modelo/alumno';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';


@Component({
  selector: 'app-alumno-formulario',
  templateUrl: './alumno-formulario.component.html',
  styleUrl: './alumno-formulario.component.scss'
})
export class AlumnoFormularioComponent implements OnChanges {

  formulario!: FormGroup
  niveles=['inicial','primario','secundario','terciario']

  @Output() nuevoAlumno = new EventEmitter()
  @Input() actualizarAlumno!:Alumno | null

  constructor(private fb:FormBuilder){
      this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
      nivel: ['', Validators.required],
      ano: ['', [Validators.pattern('^[1-6]$'), Validators.required]],
      curso: ['', [Validators.required, Validators.pattern('^[a-zA-Z]$')]],
    });


  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['actualizarAlumno'] && this.actualizarAlumno) {
      this.formulario.patchValue(this.actualizarAlumno);
    }
  }

  enviar(){
    const nuevoAlumno = this.formulario.value
    this.nuevoAlumno.emit(nuevoAlumno)
    this.formulario.reset()
  }

  cancelar(){
    this.formulario.reset()
    this.nuevoAlumno.emit()
  }

}
