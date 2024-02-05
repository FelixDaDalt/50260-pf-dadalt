import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { clase } from './modelos/clase';
import { v4 as uuidClase } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  private clases$=new BehaviorSubject<clase[]>([])
  private clases:clase[]=[]

  constructor() { }

  obtenerClases(){
    return this.clases$.asObservable()
  }

  agregarclases(clase:clase){
    clase.id=uuidClase()
    this.clases.push(clase)

    this.clases$.next(this.clases)
  }

  borrarclase(clase:clase){
    const indice = this.clases.findIndex(cla=>cla===clase)
    if(indice!== -1){
      this.clases.splice(indice,1)
      this.clases$.next(this.clases)
    }
  }

  actualizarclases(clase:clase){
    const indice = this.clases.findIndex(cla=>cla.id==clase.id)
    if(indice!== -1){
      const claseViejo = this.clases[indice]
     /* if(claseViejo.curso !== clase.curso)
      {
        this.cursosService.actualizarclaseCurso(claseViejo,clase)
      }*/
      this.clases[indice]=clase
      this.clases$.next(this.clases)
    }
  }

}
