import { Alumno } from "../../alumnos/modelos/alumno"
import { curso } from "../../cursos/modelos/curso"

export interface inscripcion{
  alumnoId: string
  cursoId: string
  id: string
  curso?: curso
  alumno?: Alumno
}
