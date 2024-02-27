import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { inscripcion } from '../modelo/inscripcion';
import { Alumno } from '../../alumnos/modelos/alumno';
import { curso } from '../../cursos/modelos/curso';

export const InscripcionActions = createActionGroup({
  source: 'Inscripcion',
  events: {
    'Cargar Inscripcions': emptyProps(),
    'Cargar Inscripcions Success': props<{ data: inscripcion[] }>(),
    'Cargar Inscripcions Failure': props<{ error: unknown }>(),

    'Agregar Inscripcion': props<{ data: inscripcion}>(),
    'Agregar Inscripcion Success': props<{ data: inscripcion }>(),
    'Agregar Inscripcion Failure': props<{ error: unknown }>(),
    'Agregar Inscripcion Existente Failure': emptyProps(),
    'Agregar Inscripcion Aceptar': emptyProps(),

    'Borrar Inscripcion': props<{ data: inscripcion}>(),
    'Borrar Inscripcion Success': props<{ data: inscripcion }>(),
    'Borrar Inscripcion Failure': props<{ error: unknown }>(),

    'Actualizar Inscripcion': props<{ data: inscripcion}>(),
    'Actualizar Inscripcion Success': props<{ data: inscripcion }>(),
    'Actualizar Inscripcion Failure': props<{ error: unknown }>(),

    'Cargar Alumnos': emptyProps(),
    'Cargar Alumnos Success': props<{ data: Alumno[] }>(),
    'Cargar Alumnos Failure': props<{ error: unknown }>(),

    'Cargar Cursos': emptyProps(),
    'Cargar Cursos Success': props<{ data: curso[] }>(),
    'Cargar Cursos Failure': props<{ error: unknown }>(),



  },
});
