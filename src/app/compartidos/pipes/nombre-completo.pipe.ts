import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from '../../layouts/dashboard/pages/alumnos/modelo/alumno';

@Pipe({
  name: 'nombreCompleto'
})
export class NombreCompletoPipe implements PipeTransform {

  transform(value: Alumno, mode?:'uppercase' | 'lowercase' | 'capitalcase', ...args: unknown[]): unknown {
    console.log(args);
    const valor = value.apellido + ', ' + value.nombre;
    switch (mode) {
      case 'uppercase':
        return valor.toUpperCase();
      case 'lowercase':
        return valor.toLowerCase();
      case 'capitalcase':
        return this.formatoCapitalCase(valor);
      default:
        return valor;
    }
  }

  private formatoCapitalCase(valor: string): string {
    return valor.toLowerCase().replace(/\b\w/g, (letra) => letra.toUpperCase());
  }

}


