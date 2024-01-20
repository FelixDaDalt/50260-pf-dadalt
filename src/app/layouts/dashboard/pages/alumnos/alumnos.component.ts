import { Component } from '@angular/core';
import { Alumno } from './modelo/alumno';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss'
})
export class AlumnosComponent {

  displayedColumns: string[] = ['apellidoyNombre','ano','curso','telefono','#'];
  alumnos= new MatTableDataSource<Alumno>([]);
  alumnoActualizar!:Alumno|null

  enviarAlumno(event:Alumno):void{
    if(event)
    {
      if(this.alumnoActualizar){
        this.modificarAlumno(event)
        return
      }
      this.agregarAlumno(event)
    }
    this.alumnoActualizar = null
  }


  private modificarAlumno(event:Alumno):void{
    const indice = this.alumnos.data.findIndex(alumno=>alumno==this.alumnoActualizar)
    if(indice!== -1){
      this.alumnos.data[indice]=event
      this.alumnoActualizar = null
      this.alumnos._updateChangeSubscription()
    }
  }

  private agregarAlumno(event:Alumno):void{
    this.alumnos.data.push(event)
    this.alumnos._updateChangeSubscription()
    return
  }

  eliminarAlumno(alumno:Alumno):void{
    const indice = this.alumnos.data.findIndex(alu=>alu===alumno)
    if(indice!== -1){
      this.alumnos.data.splice(indice,1)
      this.alumnos._updateChangeSubscription()
    }
  }

  actualizarAlumno(alumno:Alumno):void{
    this.alumnoActualizar=alumno
  }
}
