import keplerGlReducer from 'kepler.gl/reducers';
import { reducer as appReducer } from './app';

export default {
  keplerGl: keplerGlReducer,
  app: appReducer,
};
