import { AlumnosService } from './../../alumnos.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from '../../modelos/alumno';

@Component({
  selector: 'app-alumno-ver',
  templateUrl: './alumno-ver.component.html',
  styleUrl: './alumno-ver.component.scss'
})
export class AlumnoVerComponent {

  alumno?:Alumno | null

  constructor(private activatedRoute: ActivatedRoute, private alumnosService:AlumnosService,private router:Router) {
    const alumnoId = this.activatedRoute.snapshot.params['id']
    if(alumnoId){
      this.buscarAlumno(alumnoId)
    }
  }

  buscarAlumno(alumnoId:string){
    const alumno = this.alumnosService.buscarAlumno(alumnoId)
    if(alumno){
      this.alumno = alumno
    }else{
      this.redireccionar()
    }
  }

  redireccionar(){
    this.router.navigate(['dashboard','alumnos'])
  }

  volver(){
    this.alumno = null
    this.router.navigate(['dashboard','alumnos'])
  }

  verCurso(idCurso?: string | null) {
    if (idCurso !== null && idCurso !== undefined) {
      console.log(idCurso)
      this.router.navigate(['dashboard', 'cursos', 'ver', idCurso]);
    }
  }
}
