import { CursosService } from './../cursos/cursos.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alumno } from './modelos/alumno';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  private alumnos$=new BehaviorSubject<Alumno[]>([])
  private alumnos:Alumno[]=[]

  constructor(private cursosService:CursosService,
    private httpClient:HttpClient) {
    this.getAlumnos()
    this.suscripcionCurso()
  }


  private getAlumnos(){
    this.httpClient.get<Alumno[]>(`http://localhost:3000/alumnos`).subscribe({
      next:(alumnos)=>{
        this.alumnos = alumnos
        this.alumnos$.next(this.alumnos)
      }
    })
  }

  private addAlumno(alumno:Alumno){
    this.httpClient.post<Alumno>(`http://localhost:3000/alumnos`,alumno).subscribe({
      next:(alumno)=>{
        this.getAlumnos()
        this.cursosService.agregarAlumnoCurso(alumno)
      }
    })
  }

  private deleteAlumno(alumno:Alumno){
    this.httpClient.delete<Alumno>(`http://localhost:3000/alumnos/${alumno.id}`).subscribe({
      next:(alumno)=>{
        this.getAlumnos()
      }
    })
  }

  private updateAlumno(alumno:Alumno){
    this.httpClient.put<Alumno>(`http://localhost:3000/alumnos/${alumno.id}`,alumno).subscribe({
      next:(alumno)=>{
        this.getAlumnos()
      }
    })
  }

  suscripcionAlumnos(){
    return this.alumnos$.asObservable()
  }

  agregarAlumnos(alumno:Alumno){
    this.addAlumno(alumno)
  }

  borrarAlumno(alumno:Alumno){
    const indice = this.alumnos.findIndex(alu=>alu.id==alumno.id)
    if(indice!== -1){
      const alumno = this.alumnos[indice]
      this.cursosService.borrarAlumnoCurso(alumno)
      this.deleteAlumno(alumno)
    }

  }


  actualizarAlumnos(alumno:Alumno){
    const indice = this.alumnos.findIndex(alu=>alu.id==alumno.id)
    if(indice!== -1){
      const alumnoViejo = this.alumnos[indice]
      if(alumnoViejo.curso_id !== alumno.curso_id)//cambio de curso
      {
        this.cursosService.actualizarAlumnoCurso(alumnoViejo,alumno)
      }
      this.alumnos[indice]=alumno
      this.updateAlumno(this.alumnos[indice])
    }
  }

  buscarAlumno(id:string){
    return this.alumnos.find(alumno=>alumno.id === id)
  }


  private suscripcionCurso() {
    this.cursosService.cursoActualizado().subscribe({
        next: (curso) => {
            if (curso) {
                for (const alumno of this.alumnos) {
                    // Busca la clase correspondiente en el curso
                    const alumnoCorrespondiente = curso.alumnos_id.find((a) => a === alumno.id);
                    if (alumnoCorrespondiente && !curso.delete) {
                        // Si se encuentra la clase correspondiente, asigna el curso a esa clase
                        alumno.curso_id = curso.id;
                        this.updateAlumno(alumno)
                    } else {
                      // Si la clase no se encuentra en el curso actualizado, elimina la asignación de curso
                      alumno.curso_id = null;
                      this.updateAlumno(alumno);
                  }

                }
            }
        }
    });
}
}
