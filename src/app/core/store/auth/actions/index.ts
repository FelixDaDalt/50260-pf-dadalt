import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { usuario } from "../../../../layouts/auth/modelos/usuario";

export const usuarioAuth = createActionGroup(
  {
    source:'usuarioAuth',
    events:{
      'establecer': props<{usuario:usuario}>(),
      'eliminar': emptyProps()
    }
  }
  );
