import keplerGlReducer from 'kepler.gl/reducers';
import { reducer as appReducer, initialState as appInitialState } from './app';

export const initialState = {
  app: appInitialState,
  keplerGl: {},
};

export const reducer = {
  keplerGl: keplerGlReducer,
  app: appReducer,
};
