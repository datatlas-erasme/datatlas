import keplerGlReducer from 'kepler.gl/reducers';
import type { KeplerGlState } from 'kepler.gl/src/reducers/core';
import { reducer as appReducer, initialState as appInitialState, AppState } from './app';
import { combineReducers } from '@reduxjs/toolkit';

export interface RootState {
  app: AppState;
  keplerGl: KeplerGlState;
}

export const initialState: Partial<RootState> = {
  app: appInitialState,
  keplerGl: keplerGlReducer().state,
};

export const reducer = combineReducers({
  keplerGl: keplerGlReducer,
  app: appReducer,
});
