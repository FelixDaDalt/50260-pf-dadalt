import { createReducer, on } from "@ngrx/store"
import { usuario } from "../../../../layouts/auth/modelos/usuario"
import { usuarioAuth } from "../actions"

export const featureName='userAuthEstado'

export interface authEstado {
  usuario:usuario | null
}

const usuarioInicial:authEstado = {usuario:null}

export const usuarioReducer = createReducer<authEstado>(
  usuarioInicial,
  on(usuarioAuth.establecer, (estado,action) => {
    return {
      ...estado,
      usuario:action.usuario
    }
  }),

  on(usuarioAuth.eliminar, (estado) => {
    return {
      ...estado,
      usuario:null
    }
  }),
)
