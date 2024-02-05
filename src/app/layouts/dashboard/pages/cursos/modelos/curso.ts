import { Alumno } from "../../alumnos/modelos/alumno";

export interface curso{
  id:string;
  nombre:string;
  alumnos:Alumno[];
}
