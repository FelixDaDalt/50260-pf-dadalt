import { Pipe, PipeTransform } from '@angular/core';
import { ClasesService } from '../../layouts/dashboard/pages/clases/clases.service';

@Pipe({
  name: 'clase'
})
export class ClasePipe implements PipeTransform {

  constructor(private claseService: ClasesService) {}

  async transform(id: string, mode?:'nombre' | 'diasCursada' | 'horario' | 'Fecha' | 'Docente'): Promise<any> {

    this.claseService.buscarClase(id).subscribe({
      next:(clase)=>{
        if(!clase[0]){
          return 'Sin Asignacion'
        }
        switch (mode) {
          case 'nombre':
            return clase[0]?.nombre;
          case 'diasCursada':
            return clase[0]?.diasCursada;
          case 'horario':
            return clase[0]?.horaInicio +'-'+clase[0]?.horaFin;
          case 'Fecha':
            return clase[0]?.fechaInicio +'-'+clase[0]?.fechaFin;
          case 'Docente':
            return clase[0]?.docente;
          default:
            return clase;
        }
      }

    })

  }



}
