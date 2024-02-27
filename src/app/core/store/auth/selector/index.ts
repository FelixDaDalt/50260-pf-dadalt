import { createFeatureSelector, createSelector } from "@ngrx/store"
import { authEstado, featureName } from "../reducer"

export const selectorEstadoUsuario = createFeatureSelector<authEstado>(featureName)

export const selectorUsuario = createSelector(selectorEstadoUsuario,(estado)=>
  estado.usuario
)

