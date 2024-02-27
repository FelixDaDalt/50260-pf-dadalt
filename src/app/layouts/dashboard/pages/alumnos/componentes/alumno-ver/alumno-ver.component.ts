import { curso } from './../../../cursos/modelos/curso';
import { AlumnosService } from './../../alumnos.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from '../../modelos/alumno';
import { inscripcion } from '../../../inscripciones/modelo/inscripcion';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-alumno-ver',
  templateUrl: './alumno-ver.component.html',
  styleUrl: './alumno-ver.component.scss'
})
export class AlumnoVerComponent {

  alumno?:Alumno | null
  cursos?:curso[] = []
  inscripciones$?:Observable<inscripcion[]>

  constructor(private activatedRoute: ActivatedRoute,
    private alumnosService:AlumnosService,
    private router:Router,
    private location: Location) {
    const alumnoId = this.activatedRoute.snapshot.params['id']
    if(alumnoId){
      this.buscarAlumno(alumnoId)
    }
  }

  buscarAlumno(alumnoId:string){
    this.alumnosService.buscarAlumno(alumnoId).subscribe({
      next:(alumno)=>{
        if(alumno.length>0){
          this.alumno = alumno[0]
          this.buscarCursos()
        }else{
          this.redireccionar()
        }
      }
    })
  }

  buscarCursos(){
    if(this.alumno?.id)
      this.inscripciones$ = this.alumnosService.buscarAlumnoCurso(this.alumno.id)
  }

  redireccionar(){
    this.router.navigate(['dashboard','alumnos'])
  }

  volver(){
    this.alumno = null
    this.location.back();
  }

  verCurso(idCurso?: string | null) {
    if(!!idCurso) {
      this.router.navigate(['dashboard', 'cursos', 'ver', idCurso]);
    }
  }

  eliminarInscripcion(idInscripcion:string){
    this.alumnosService.eliminarInscripcion(idInscripcion).subscribe({
      next:(respuesta)=>{
        this.buscarCursos()
      }
    })
  }
}
