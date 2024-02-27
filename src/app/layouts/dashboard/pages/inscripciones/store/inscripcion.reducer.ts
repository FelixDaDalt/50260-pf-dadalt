import { createFeature, createReducer, on } from '@ngrx/store';
import { InscripcionActions } from './inscripcion.actions';
import { inscripcion } from '../modelo/inscripcion';
import { Alumno } from '../../alumnos/modelos/alumno';
import { curso } from '../../cursos/modelos/curso';

export interface State {
  inscripciones:inscripcion[]
  alumnos:Alumno[]
  cursos:curso[]
  error:unknown
 }

export const inscripcionFeatureKey = 'inscripcion';



export const initialState: State = {
  inscripciones:[],
  alumnos:[],
  cursos:[],
  error:null
};

export const reducer = createReducer(
  initialState,
  on(InscripcionActions.cargarInscripcions, (state) => ({...state})),
  on(InscripcionActions.cargarInscripcionsSuccess, (state, action) => ({...state,inscripciones:action.data})),
  on(InscripcionActions.cargarInscripcionsFailure, (state, action) => ({...state,error:action.error})),

  on(InscripcionActions.cargarAlumnos, (state) => ({...state})),
  on(InscripcionActions.cargarAlumnosSuccess, (state, action) => ({...state,alumnos:action.data})),
  on(InscripcionActions.cargarAlumnosFailure, (state, action) => state),

  on(InscripcionActions.cargarCursos, (state) => ({...state})),
  on(InscripcionActions.cargarCursosSuccess, (state, action) => ({...state,cursos:action.data})),
  on(InscripcionActions.cargarCursosFailure, (state, action) => state),

  on(InscripcionActions.agregarInscripcionExistenteFailure, (state) => ({
    ...state,
    error: 'Ya existe una inscripción.',
  })),
  on(InscripcionActions.agregarInscripcionAceptar, (state) => ({
    ...state,
    error:null,
  })),
);

export const inscripcionFeature = createFeature({
  name: inscripcionFeatureKey,
  reducer,
});

