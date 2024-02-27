import { CursosService } from './../../cursos/cursos.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { InscripcionActions } from './inscripcion.actions';
import { InscripcionesService } from '../inscripciones.service';
import { AlumnosService } from '../../alumnos/alumnos.service';


@Injectable()
export class InscripcionEffects {

  cargarInscripcions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionActions.cargarInscripcions),
      concatMap(() =>
        this.inscripcionesService.getInscripciones().pipe(
          map(data => InscripcionActions.cargarInscripcionsSuccess({ data })),
          catchError(error => of(InscripcionActions.cargarInscripcionsFailure({ error }))))
      )
    );
  });

  cargarAlumnos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionActions.cargarAlumnos),
      concatMap(() =>
        this.alumnosService.getAlumnos().pipe(
          map(data => InscripcionActions.cargarAlumnosSuccess({ data })),
          catchError(error => of(InscripcionActions.cargarAlumnosFailure({ error }))))
      )
    );
  });

  cargarCursos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionActions.cargarAlumnos),
      concatMap(() =>
        this.cursosService.getCursos().pipe(
          map(data => InscripcionActions.cargarCursosSuccess({ data })),
          catchError(error => of(InscripcionActions.cargarCursosFailure({ error }))))
      )
    );
  });

  agregarInscripcion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionActions.agregarInscripcion),
      switchMap((action) =>
        this.inscripcionesService.buscarInscripciones(action.data).pipe(
          concatMap((inscripciones) => {
            if (inscripciones.length === 0) {
              return this.inscripcionesService.addInscripcion(action.data).pipe(
                map((resp) => InscripcionActions.agregarInscripcionSuccess({ data: resp })),
                catchError(error => of(InscripcionActions.agregarInscripcionFailure({ error })))
              );
            } else {
              return of(InscripcionActions.agregarInscripcionExistenteFailure());
            }
          }),
          catchError(error => of(InscripcionActions.agregarInscripcionFailure({ error }))))
      )
    );
  });



  agregarInscripcionSucess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionActions.agregarInscripcionSuccess),
      map(()=>InscripcionActions.cargarInscripcions())
    );
  });

  borrarInscripcion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionActions.borrarInscripcion),
      concatMap((action) =>
        this.inscripcionesService.deleteInscripcion(action.data).pipe(
          map((resp) => InscripcionActions.borrarInscripcionSuccess({ data:resp })),
          catchError(error => of(InscripcionActions.borrarInscripcionFailure({ error }))))
      )
    );
  });

  borrarInscripcionSucess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionActions.borrarInscripcionSuccess),
      map(()=>InscripcionActions.cargarInscripcions())
    );
  });


  actualizarInscripcion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionActions.actualizarInscripcion),
      concatMap((action) =>
        this.inscripcionesService.updateInscripcion(action.data).pipe(
          map((resp) => InscripcionActions.actualizarInscripcionSuccess({ data:resp })),
          catchError(error => of(InscripcionActions.actualizarInscripcionFailure({ error }))))
      )
    );
  });

  actualizarInscripcionSucess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionActions.actualizarInscripcionSuccess),
      map(()=>InscripcionActions.cargarInscripcions())
    );
  });


  constructor(private actions$: Actions,
    private inscripcionesService:InscripcionesService,
    private alumnosService:AlumnosService,
    private cursosService:CursosService) {}
}
