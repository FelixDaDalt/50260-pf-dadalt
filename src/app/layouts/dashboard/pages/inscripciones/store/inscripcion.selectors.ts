import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscripcion from './inscripcion.reducer';

export const selectInscripcionState = createFeatureSelector<fromInscripcion.State>(
  fromInscripcion.inscripcionFeatureKey
);

export const seleccionarInscripciones = createSelector(selectInscripcionState, (state) =>state.inscripciones)
export const seleccionarError = createSelector(selectInscripcionState, (state) =>state.error)
export const seleccionarAlumnos = createSelector(selectInscripcionState, (state) =>state.alumnos)
export const seleccionarCursos = createSelector(selectInscripcionState, (state) =>state.cursos)

