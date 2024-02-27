import { Component } from '@angular/core';
import { curso } from '../../modelos/curso';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../../cursos.service';
import { inscripcion } from '../../../inscripciones/modelo/inscripcion';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-curso-ver',
  templateUrl: './curso-ver.component.html',
  styleUrl: './curso-ver.component.scss'
})
export class CursoVerComponent {
  curso?:curso | null
  inscripciones$?:Observable<inscripcion[]>

  constructor(private activatedRoute: ActivatedRoute,
    private cursoService:CursosService,
    private router:Router,
    private location: Location) {
    const cursoId = this.activatedRoute.snapshot.params['id']
    if(cursoId){
      this.buscarCurso(cursoId)
    }else{
      this.redireccionar()
    }
  }

  buscarCurso(cursoId:string){
    this.cursoService.buscarCurso(cursoId).subscribe({
      next:(curso)=>{
        if(curso.length>0){
          this.curso = curso[0]
          this.buscarAlumnos()
        }else{
          this.redireccionar()
        }
      }
    })
  }

  buscarAlumnos(){
  if(this.curso?.id)
        this.inscripciones$ = this.cursoService.buscarAlumnoCurso(this.curso.id)
  }

  redireccionar(){
    this.router.navigate(['dashboard','cursos'])
  }

  volver(){
    this.curso = null
    this.location.back();
  }

  verAlumno(idAlumno?:string | null){
    if(!!idAlumno)
      this.router.navigate(['dashboard','alumnos','ver',idAlumno])
  }

  eliminarInscripcion(idInscripcion:string){
    this.cursoService.eliminarInscripcion(idInscripcion).subscribe({
      next:(respuesta)=>{
        this.buscarAlumnos()
      }
    })
  }


}
