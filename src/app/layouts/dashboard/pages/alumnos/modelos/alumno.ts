import { curso } from "../../cursos/modelos/curso";

export interface Alumno{
  id:string,
  nombre:string,
  apellido:string,
  documento:number,
  telefono:number,
  direccion:string,
  curso:curso
}
