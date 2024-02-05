import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { curso } from './modelos/curso';
import { v4 as uuidCurso } from 'uuid';
import { Alumno } from '../alumnos/modelos/alumno';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private curso$=new BehaviorSubject<curso | null>(null)
  private cursos$=new BehaviorSubject<curso[]>([])
  private cursos:curso[]=[]

  constructor() { }

  obtenerCursos(){
    return this.cursos$.asObservable()
  }

  cursoActualizado(){
    return this.curso$.asObservable()
  }

  agregarCursos(curso:curso){
    curso.id=uuidCurso()
    curso.alumnos=[]
    this.cursos.push(curso)
    this.cursos$.next(this.cursos)
  }

  borrarCurso(curso:curso){
    const indice = this.cursos.findIndex(cur=>cur===curso)
    if(indice!== -1){
      this.cursos.splice(indice,1)
      this.cursos$.next(this.cursos)
    }
  }

  actualizarCursos(curso:curso){
    const indice = this.cursos.findIndex(cur=>cur.id==curso.id)
    if(indice!== -1){
      this.cursos[indice]=curso
      this.cursos$.next(this.cursos)
      this.curso$.next(this.cursos[indice])
    }
  }

  agregarAlumnoCurso(alumno:Alumno){
    const indice = this.cursos.findIndex(curso=>curso.id==alumno.curso.id)
    if(indice!==-1){
      this.cursos[indice].alumnos.push(alumno)
      this.cursos$.next(this.cursos)
    }
  }

  actualizarAlumnoCurso(alumnoViejo:Alumno, alumnoNuevo:Alumno){
    const indiceCurso = this.cursos.findIndex(curso=>curso.id==alumnoViejo.curso.id)
    if(indiceCurso!==-1){
      const indiceAlumno = this.cursos[indiceCurso].alumnos.findIndex(alu=>alu.id == alumnoViejo.id)
      if(indiceAlumno!==-1){
        this.cursos[indiceCurso].alumnos.splice(indiceAlumno,1)
        this.agregarAlumnoCurso(alumnoNuevo)
      }
    }
  }

  buscarCurso(id:string){
    return this.cursos.find(cur=>cur.id === id)
  }
}


