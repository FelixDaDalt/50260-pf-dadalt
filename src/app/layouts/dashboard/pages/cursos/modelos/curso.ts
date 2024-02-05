import { Alumno } from "../../alumnos/modelos/alumno";
import { clase } from "../../clases/modelos/clase";

export interface curso{
  id:string;
  nombre:string;
  alumnos:Alumno[];
  clases:clase[]
}
