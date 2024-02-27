
import { environment } from "../../../../../environments/environment";
import { Injectable } from "@angular/core";
import { inscripcion } from "./modelo/inscripcion";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: `root`
})
export class InscripcionesService {

  constructor(private httpClient:HttpClient) {

  }

  getInscripciones() : Observable<inscripcion[]>{
    return this.httpClient.get<inscripcion[]>(`${environment.apiUrl}/inscripciones?_embed=curso&_embed=alumno`)
  }

  addInscripcion(inscripcion:inscripcion){
    return this.httpClient.post<inscripcion>(`${environment.apiUrl}/inscripciones`,inscripcion)
  }

  deleteInscripcion(inscripcion:inscripcion){
    return this.httpClient.delete<inscripcion>(`${environment.apiUrl}/inscripciones/${inscripcion.id}`)
  }

  updateInscripcion(inscripcion:inscripcion){
    return this.httpClient.put<inscripcion>(`${environment.apiUrl}/inscripciones/${inscripcion.id}`,inscripcion)
  }

  buscarInscripciones(inscripcion:inscripcion){
    return this.httpClient.get<inscripcion[]>(`${environment.apiUrl}/inscripciones?alumnoId=${inscripcion.alumnoId}&cursoId=${inscripcion.cursoId}`)
  }
}
