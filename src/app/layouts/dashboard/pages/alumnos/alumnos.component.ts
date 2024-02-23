import { CursosService } from './../cursos/cursos.service';
import { Component } from '@angular/core';
import { Alumno } from './modelos/alumno';
import { MatTableDataSource } from '@angular/material/table';
import { AlumnosService } from './alumnos.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../../compartidos/dialog/dialog.component';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss'
})
export class AlumnosComponent {

  displayedColumns: string[] = ['id','apellidoyNombre','DNI','curso','#'];
  alumnos= new MatTableDataSource<Alumno>([]);
  alumnoActualizar!:Alumno|null

  constructor(private alumnosService:AlumnosService,
    private router: Router,
    private cursosService:CursosService,
    public dialog: MatDialog){
    this.obtenerAlumnos()
  }

  private obtenerAlumnos(){
    this.alumnosService.suscripcionAlumnos().subscribe({
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
  }


  private modificarAlumno(alumno:Alumno):void{
    this.alumnosService.actualizarAlumnos(alumno)
  }

  private agregarAlumno(alumno:Alumno):void{
    this.alumnosService.agregarAlumnos(alumno)
  }

  eliminarAlumno(alumno:Alumno):void{
    if(alumno.curso_id){
      const dialogRef = this.dialog.open(DialogComponent, {
        data: {titulo: 'Error', contenido: 'No se puede eliminar '+alumno.apellido+','+alumno.nombre+' porque esta asignado a un curso.'},
      });
      return;
    }
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

  getCursoNombre(id_curso:string){
    return this.cursosService.buscarCurso(id_curso)
  }
}
