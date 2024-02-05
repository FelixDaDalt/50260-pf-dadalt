import { Component } from '@angular/core';
import { Alumno } from './modelos/alumno';
import { MatTableDataSource } from '@angular/material/table';
import { AlumnosService } from './alumnos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss'
})
export class AlumnosComponent {

  displayedColumns: string[] = ['id','apellidoyNombre','DNI','curso','#'];
  alumnos= new MatTableDataSource<Alumno>([]);
  alumnoActualizar!:Alumno|null

  constructor(private alumnosService:AlumnosService,private router: Router){
    this.obtenerAlumnos()
  }

  private obtenerAlumnos(){
    this.alumnosService.obtenerAlumnos().subscribe({
      next:(alumnos)=>{
        this.alumnos.data = alumnos
        this.alumnos._updateChangeSubscription()
      }
    })
  }

  enviarAlumno(event:Alumno):void{
    if(event)
    {
      if(this.alumnoActualizar){
        this.modificarAlumno(event)
        this.alumnoActualizar = null
        return
      }
      this.agregarAlumno(event)
    }
    this.alumnoActualizar = null
  }


  private modificarAlumno(alumno:Alumno):void{
    this.alumnosService.actualizarAlumnos(alumno)
  }

  private agregarAlumno(alumno:Alumno):void{
    this.alumnosService.agregarAlumnos(alumno)
  }

  eliminarAlumno(alumno:Alumno):void{
    this.alumnosService.borrarAlumno(alumno)
  }

  actualizarAlumno(alumno:Alumno):void{
    this.alumnoActualizar=alumno
  }

  verAlumno(alumno:Alumno):void{
    this.router.navigate(
      [
        'dashboard',
        'alumnos',
        'ver',
        alumno.id,
      ])
  }
}
