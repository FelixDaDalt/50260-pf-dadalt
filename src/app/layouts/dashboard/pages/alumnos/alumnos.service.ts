import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alumno } from './modelos/alumno';
import { HttpClient } from '@angular/common/http';
import { inscripcion } from '../inscripciones/modelo/inscripcion';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  private alumnos$=new BehaviorSubject<Alumno[]>([])


  constructor(
    private httpClient:HttpClient) {
    this.obtenerAlumnos()
  }


  getAlumnos() : Observable<Alumno[]>{
   return this.httpClient.get<Alumno[]>(`${environment.apiUrl}/alumnos`)
  }

  obtenerAlumnos(){
    this.getAlumnos().subscribe({
      next:(alumnos)=>{
        this.alumnos$.next(alumnos)
      }
    })
  }

  private addAlumno(alumno:Alumno){
    this.httpClient.post<Alumno>(`${environment.apiUrl}/alumnos`,alumno).subscribe({
      next:(alumno)=>{
        this.obtenerAlumnos()
      }
    })
  }

  private deleteAlumno(alumno:Alumno){
    this.httpClient.delete<any>(`${environment.apiUrl}/alumnos/${alumno.id}?dependent=inscripciones`).subscribe({
      next:(alumno)=>{
        this.obtenerAlumnos()
      }
    })
  }

  private updateAlumno(alumno:Alumno){
    this.httpClient.put<Alumno>(`${environment.apiUrl}/alumnos/${alumno.id}`,alumno).subscribe({
      next:(alumno)=>{
        this.obtenerAlumnos()
      }
    })
  }


  agregarAlumnos(alumno:Alumno){
    this.addAlumno(alumno)
  }

  borrarAlumno(alumno:Alumno){
    this.deleteAlumno(alumno)
  }

  actualizarAlumnos(alumno:Alumno){
    this.updateAlumno(alumno)
  }

  buscarAlumnoCurso(id:string){
    return this.httpClient.get<inscripcion[]>(`${environment.apiUrl}/inscripciones?_embed=curso&_embed=alumno&alumnoId=${id}`)
  }

  buscarAlumno(id: string):Observable<Alumno[]> {
    return this.httpClient.get<Alumno[]>(`${environment.apiUrl}/alumnos?id=${id}`)
  }

  eliminarInscripcion(id:string){
    return this.httpClient.delete<inscripcion[]>(`${environment.apiUrl}/inscripciones/${id}`)
  }

  suscripcionAlumnos(){
    return this.alumnos$.asObservable()
  }

}
