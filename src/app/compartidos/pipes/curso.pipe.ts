import { Pipe, PipeTransform } from '@angular/core';
import { CursosService } from '../../layouts/dashboard/pages/cursos/cursos.service';
import { map } from 'rxjs';

@Pipe({
  name: 'curso'
})
export class CursoPipe implements PipeTransform {
  constructor(private cursoService: CursosService) {}

  async transform(id: string | null, mode?: 'nombre'): Promise<any> {
    if (id == null) {
      return 'Sin Asignación';
    } else {
      try {
        const curso = await this.cursoService.buscarCurso(id).toPromise();
        if (!curso) {
          return 'Sin Asignación';
        }

        switch (mode) {
          case 'nombre':
            return curso[0].nombre;
          default:
            return curso;
        }
      } catch (error) {
        console.error('Error al buscar curso:', error);
        return 'Sin Asignación';
      }
    }
  }

}
