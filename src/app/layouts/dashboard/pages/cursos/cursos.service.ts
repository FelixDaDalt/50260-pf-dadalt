import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { curso } from './modelos/curso';
import { inscripcion } from '../inscripciones/modelo/inscripcion';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursosService {


  private cursos$=new BehaviorSubject<curso[]>([])


  constructor(private httpClient:HttpClient) {
    this.obtenercursos()
  }

 /// API
  getCursos():Observable<curso[]>{
    return this.httpClient.get<curso[]>(`${environment.apiUrl}/cursos`)
  }

  private obtenercursos(){
    this.getCursos().subscribe({
      next:(cursos)=>{
        this.cursos$.next(cursos)
      }
    })
  }

  private postCurso(curso:curso){
    this.httpClient.post<curso>(`${environment.apiUrl}/cursos`,curso).subscribe({
      next:(cursoRPTA)=>{
        this.obtenercursos()
      }
    })
  }

  private deleteCurso(curso:curso){
    this.httpClient.delete<curso>(`${environment.apiUrl}/cursos/${curso.id}?dependent=inscripciones`).subscribe({
      next:(cursoRPTA)=>{
        this.obtenercursos()
      }
    })
  }

  private updateCurso(curso:curso){
    this.httpClient.put<curso>(`${environment.apiUrl}/cursos/${curso.id}`,curso).subscribe({
      next:(cursoRPTA)=>{
        this.obtenercursos()
      }
    })
  }



  buscarCurso(id: string):Observable<curso[]> {
    return this.httpClient.get<curso[]>(`${environment.apiUrl}/cursos?id=${id}`)
  }

  buscarAlumnoCurso(id:string){
    return this.httpClient.get<inscripcion[]>(`${environment.apiUrl}/inscripciones?_embed=curso&_embed=alumno&cursoId=${id}`)
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

  suscripcionCursos(){
    return this.cursos$.asObservable()
  }

  eliminarInscripcion(id:string){
    return this.httpClient.delete<inscripcion[]>(`${environment.apiUrl}/inscripciones/${id}`)
  }

}


