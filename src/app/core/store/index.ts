import { usuarioReducer } from './auth/reducer';
import { featureName as authFeatureName} from './auth/reducer/index';

// Lo Reducers se ejecutan apartir de Acciones para cambiar estado de los datos
// y por medio de los selector nos suscribimos a esos datos los cuales son un atajo a los valores


//Exportamos los Reducers
export const appReducers = {
  [authFeatureName]:usuarioReducer
}
