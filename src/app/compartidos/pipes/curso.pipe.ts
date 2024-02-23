import { Pipe, PipeTransform } from '@angular/core';
import { CursosService } from '../../layouts/dashboard/pages/cursos/cursos.service';

@Pipe({
  name: 'curso'
})
export class CursoPipe implements PipeTransform {
  constructor(private cursoService: CursosService) {}

  transform(id: string | null, mode?:'nombre' | 'alumnos' | 'clases_id',): any {

    if(id==null){
      return 'Sin Asignacion'
    }

    let curso = this.cursoService.buscarCurso(id);
    if(!curso){
      return 'Sin Asignacion'
    }

    switch (mode) {
      case 'nombre':
        return curso?.nombre;
      case 'alumnos':
        return curso?.alumnos_id;
      case 'clases_id':
        return curso?.clases_id;
      default:
        return curso;
    }
  }

}
