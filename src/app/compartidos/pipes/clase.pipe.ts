import { Pipe, PipeTransform } from '@angular/core';
import { ClasesService } from '../../layouts/dashboard/pages/clases/clases.service';

@Pipe({
  name: 'clase'
})
export class ClasePipe implements PipeTransform {

  constructor(private claseService: ClasesService) {}

  async transform(id: string, mode?:'nombre' | 'diasCursada' | 'horario' | 'Fecha' | 'Docente'): Promise<any> {
    let clase = await this.claseService.buscarClase(id)
    if(!clase){
      return 'Sin Asignacion'
    }
    switch (mode) {
      case 'nombre':
        return clase?.nombre;
      case 'diasCursada':
        return clase?.diasCursada;
      case 'horario':
        return clase?.horaInicio +'-'+clase?.horaFin;
      case 'Fecha':
        return clase?.fechaInicio +'-'+clase?.fechaFin;
      case 'Docente':
        return clase?.docente;
      default:
        return clase;
    }
  }



}
