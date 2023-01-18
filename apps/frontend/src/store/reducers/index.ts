import { combineReducers } from '@reduxjs/toolkit';
import { reducer as appReducer, initialState as appInitialState } from './app';
import { reducer as keplerGlReducer } from './keplerGl';

export const reducer = combineReducers({
  keplerGl: keplerGlReducer,
  app: appReducer,
});

export type RootState = ReturnType<typeof reducer>;

export const initialState: Partial<RootState> = {
  app: appInitialState,
};
