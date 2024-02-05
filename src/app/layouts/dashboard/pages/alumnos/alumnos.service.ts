import { CursosService } from './../cursos/cursos.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alumno } from './modelos/alumno';
import { v4 as uuidAlumno } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  private alumnos$=new BehaviorSubject<Alumno[]>([])
  private alumnos:Alumno[]=[]

  constructor(private cursosService:CursosService) {
    this.suscripcionCurso()
  }

  obtenerAlumnos(){
    return this.alumnos$.asObservable()
  }

  agregarAlumnos(alumno:Alumno){
    alumno.id=uuidAlumno()
    this.alumnos.push(alumno)
    this.cursosService.agregarAlumnoCurso(alumno)
    this.alumnos$.next(this.alumnos)
  }

  borrarAlumno(alumno:Alumno){
    const indice = this.alumnos.findIndex(alu=>alu===alumno)
    if(indice!== -1){
      this.alumnos.splice(indice,1)
      this.alumnos$.next(this.alumnos)
    }
  }

  actualizarAlumnos(alumno:Alumno){
    const indice = this.alumnos.findIndex(alu=>alu.id==alumno.id)
    if(indice!== -1){
      const alumnoViejo = this.alumnos[indice]
      if(alumnoViejo.curso !== alumno.curso)//cambio de curso
      {
        this.cursosService.actualizarAlumnoCurso(alumnoViejo,alumno)
      }
      this.alumnos[indice]=alumno
      this.alumnos$.next(this.alumnos)
    }
  }

  buscarAlumno(id:string){
    return this.alumnos.find(alumno=>alumno.id === id)
  }

  private suscripcionCurso(){
    this.cursosService.cursoActualizado().subscribe({
      next:(curso)=>{
        if(curso){
            for (const alumno of this.alumnos) {
              if (alumno.curso.id === curso.id) {
                alumno.curso = curso;
              }
            }
            this.alumnos$.next(this.alumnos)
          }
        }
    })
  }


}
