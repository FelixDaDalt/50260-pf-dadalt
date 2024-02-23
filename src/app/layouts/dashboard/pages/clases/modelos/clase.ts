import { Time } from "@angular/common";
import { curso } from "../../cursos/modelos/curso";

export interface clase{
  id:string;
  nombre:string;
  diasCursada:string[];
  horaInicio:Time;
  horaFin:Time;
  fechaInicio:Date;
  fechaFin:Date;
  docente:string;
  curso_id:string | null
}
