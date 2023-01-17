import keplerGlReducer from 'kepler.gl/reducers';
import { reducer as appReducer, initialState as appInitialState, AppState } from './app';
import { combineReducers } from '@reduxjs/toolkit';

export interface RootState {
  app: AppState;
  keplerGl: unknown;
}

export const initialState = {
  app: appInitialState,
  keplerGl: {},
};

export const reducer = combineReducers({
  keplerGl: keplerGlReducer,
  app: appReducer,
});
