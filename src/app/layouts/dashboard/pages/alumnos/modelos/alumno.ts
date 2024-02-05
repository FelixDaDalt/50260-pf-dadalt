import { curso } from "../../cursos/modelos/curso";

export interface Alumno{
  id:string,
  nombre:string,
  apellido:string,
  ano:number,
  nivel:string,
  telefono:number,
  curso:curso
}
