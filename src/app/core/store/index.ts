import { usuarioReducer } from './auth/reducer';
import { featureName as authFeatureName} from './auth/reducer/index';

export const appReducers = {
  [authFeatureName]:usuarioReducer
}
