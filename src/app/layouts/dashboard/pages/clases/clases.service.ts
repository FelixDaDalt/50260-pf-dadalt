import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { clase } from './modelos/clase';
import { HttpClient } from '@angular/common/http';
import { CursosService } from '../cursos/cursos.service';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  private clases$=new BehaviorSubject<clase[]>([])
  private clases:clase[]=[]


  constructor(private httpCliente:HttpClient, private cursosService:CursosService) {
    this.getClases()
    this.suscripcionCurso()
  }


  private async getClases(): Promise<void> {
    try {
      const clases = await this.httpCliente.get<clase[]>(`http://localhost:3000/clases`).toPromise();
      this.clases = clases!;
      this.clases$.next(clases!);
    } catch (error) {
      console.error('Error al obtener las clases:', error);
      throw error; // Relanzamos el error para manejarlo en un nivel superior si es necesario
    }
  }

  private addClase(clase:clase){
    this.httpCliente.post<clase>(`http://localhost:3000/clases`,clase).subscribe({
      next:(clases)=>{
        this.getClases()
      }
    })
  }

  private deleteClase(clase:clase){
    this.httpCliente.delete<clase>(`http://localhost:3000/clases/${clase.id}`).subscribe({
      next:(clases)=>{
        this.getClases()
      }
    })
  }

  private updateClase(clase:clase){
    this.httpCliente.put<clase>(`http://localhost:3000/clases/${clase.id}`,clase).subscribe({
      next:(clase)=>{
        this.getClases()
      }
    })
  }

  suscripcionClases(){
    return this.clases$.asObservable()
  }

  agregarclases(clase:clase){
    this.addClase(clase)
  }

  borrarclase(clase:clase){
    const indice = this.clases.findIndex(cla=>cla.id==clase.id)
    if(indice!== -1){
      const clase = this.clases[indice]
      this.cursosService.borrarClaseCurso(clase)
      this.deleteClase(clase)
    }
  }

  actualizarclases(clase:clase){
    const indice = this.clases.findIndex(cla=>cla.id==clase.id)
    if(indice!== -1){
      const claseVieja = this.clases[indice]
      if(claseVieja.curso_id !== clase.curso_id)//cambio de curso
      {
        this.cursosService.actualizarClaseCurso(claseVieja,clase)
      }
      this.clases[indice]=clase
      this.updateClase(this.clases[indice])
    }

    this.updateClase(clase)
  }

  async buscarClase(id: string): Promise<clase | undefined> {
    try {
      await this.getClases(); // Esperamos a que se obtengan las clases
      return this.clases.find(cla => cla.id === id);
    } catch (error) {
      console.error('Error al buscar la clase:', error);
      return undefined;
    }
  }

  private suscripcionCurso() {
    this.cursosService.cursoActualizado().subscribe({
        next: (curso) => {
            if (curso) {
                for (const clase of this.clases) {
                    // Busca la clase correspondiente en el curso
                    const claseCorrespondiente = curso.clases_id.find((c) => c === clase.id);
                    if (claseCorrespondiente && !curso.delete) {
                        // Si se encuentra la clase correspondiente, asigna el curso a esa clase
                        clase.curso_id = curso.id;
                        this.updateClase(clase)
                    } else {
                      // Si la clase no se encuentra en el curso actualizado, elimina la asignación de curso
                      clase.curso_id = null;
                      this.updateClase(clase);
                  }

                }
            }
        }
    });
}

}
