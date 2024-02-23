import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { curso } from './modelos/curso';
import { v4 as uuidCurso } from 'uuid';
import { Alumno } from '../alumnos/modelos/alumno';
import { ClasesService } from '../clases/clases.service';
import { clase } from '../clases/modelos/clase';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private curso$=new BehaviorSubject<curso | null>(null)
  private cursos$=new BehaviorSubject<curso[]>([])
  private cursos:curso[]=[]

  constructor(private httpClient:HttpClient) {
    this.getCursos()
  }

 /// API
  private getCursos(){
    this.httpClient.get<curso[]>('http://localhost:3000/cursos').subscribe({
      next:(cursos)=>{
        this.cursos = cursos
        this.cursos$.next(this.cursos)
      }
    })
  }

  private postCurso(curso:curso){
    this.httpClient.post<curso>('http://localhost:3000/cursos',curso).subscribe({
      next:(cursoRPTA)=>{
        this.curso$.next(cursoRPTA)
        this.getCursos()
      }
    })
  }

  private deleteCurso(curso:curso){
    this.httpClient.delete<curso>(`http://localhost:3000/cursos/${curso.id}`).subscribe({
      next:(cursoRPTA)=>{
        cursoRPTA.delete = true;
        this.curso$.next(cursoRPTA)
        this.getCursos()
      }
    })
  }

  private updateCurso(curso:curso){
    this.httpClient.put<curso>(`http://localhost:3000/cursos/${curso.id}`,curso).subscribe({
      next:(cursoRPTA)=>{
        this.curso$.next(cursoRPTA)
        this.getCursos()
      }
    })
  }
 /////

  cursoActualizado(){
    return this.curso$.asObservable()
  }

  suscripcionCursos(){
    return this.cursos$.asObservable()
  }

  agregarCursos(curso:curso){
    this.postCurso(curso)
  }

  borrarCurso(curso:curso){
    this.deleteCurso(curso)
  }

  actualizarCursos(curso:curso){
    this.updateCurso(curso)
  }


  buscarCurso(id: string) {
    return this.cursos$.getValue().find(cur => cur.id === id);
  }


  ///ALUMNOS EN EL CURSO
  agregarAlumnoCurso(alumno:Alumno){
    const indice = this.cursos.findIndex(curso=>curso.id==alumno.curso_id)
    if(indice!==-1){
      this.cursos[indice].alumnos_id.push(alumno.id)
      this.updateCurso(this.cursos[indice])
    }
  }

  actualizarAlumnoCurso(alumnoViejo:Alumno, alumnoNuevo:Alumno){
    this.borrarAlumnoCurso(alumnoViejo)
    this.agregarAlumnoCurso(alumnoNuevo)
  }

  borrarAlumnoCurso(alumno:Alumno){
    const indiceCurso = this.cursos.findIndex(curso=>curso.id==alumno.curso_id)
    if(indiceCurso!==-1){
      const indiceAlumno = this.cursos[indiceCurso].alumnos_id.findIndex(alu=>alu == alumno.id)
      if(indiceAlumno!==-1){
        this.cursos[indiceCurso].alumnos_id.splice(indiceAlumno,1)
        this.updateCurso(this.cursos[indiceCurso])
      }
    }
  }


  /// CLASES EN EL CURSO
  agregarClaseCurso(clase:clase){
    const indice = this.cursos.findIndex(curso=>curso.id==clase.curso_id)
    if(indice!==-1){
      this.cursos[indice].clases_id.push(clase.id)
      this.updateCurso(this.cursos[indice])
    }
  }

  actualizarClaseCurso(claseVieja:clase, claseNueva:clase){
    this.borrarClaseCurso(claseVieja)
    this.agregarClaseCurso(claseNueva)
  }

  borrarClaseCurso(clase:clase){
    const indiceCurso = this.cursos.findIndex(curso=>curso.id==clase.curso_id)
    if(indiceCurso!==-1){
      const indiceClase = this.cursos[indiceCurso].clases_id.findIndex(cla=>cla == clase.id)
      if(indiceClase!==-1){
        this.cursos[indiceCurso].clases_id.splice(indiceClase,1)
        this.updateCurso(this.cursos[indiceCurso])
      }
    }
  }

}


