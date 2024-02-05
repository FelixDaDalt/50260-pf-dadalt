import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slice'
})
export class SlicePipe implements PipeTransform {

  transform(cadena: string,longitud: number, ...args: unknown[]): unknown {
    const valor=cadena
    if (cadena.length > longitud) {
      return cadena.slice(0, longitud) + '...';
    } else {
      return cadena;
    }
    return null;
  }

}
