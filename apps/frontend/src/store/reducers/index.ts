import { combineReducers } from '@reduxjs/toolkit';
import { reducer as appReducer, initialState as appInitialState } from './app';
import { reducer as keplerGlReducer } from './keplerGl';
import { api } from '../../api';

export const reducer = combineReducers({
  keplerGl: keplerGlReducer,
  app: appReducer,
  [api.reducerPath]: api.reducer,
});

export type RootState = ReturnType<typeof reducer>;

export const initialState: Partial<RootState> = {
  app: appInitialState,
};
