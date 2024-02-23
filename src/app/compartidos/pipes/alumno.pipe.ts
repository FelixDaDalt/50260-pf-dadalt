import { Pipe, PipeTransform } from '@angular/core';
import { AlumnosService } from '../../layouts/dashboard/pages/alumnos/alumnos.service';

@Pipe({
  name: 'alumno'
})
export class AlumnoPipe implements PipeTransform {

  constructor(private alumnosService:AlumnosService){}

  transform(id: string, mode?:'nombre' | 'apellido' | 'nombreCompleto' | 'dni'): any {
    let alumno = this.alumnosService.buscarAlumno(id)
    if(!alumno){
      return 'Sin Asignacion'
    }
    switch (mode) {
      case 'nombre':
        return alumno?.nombre;
      case 'apellido':
        return alumno?.apellido;
      case 'nombreCompleto':
        return alumno?.apellido+','+alumno?.nombre;
      case 'dni':
        return alumno?.documento;
      default:
        return alumno;
    }
  }

}
