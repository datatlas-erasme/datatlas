import { combineReducers } from '@reduxjs/toolkit';
import { reducer as userReducer, initialState as userInitialState } from './user';
import { reducer as keplerGlReducer } from './keplerGl';
import { api } from '../../api';

export const reducer = combineReducers({
  keplerGl: keplerGlReducer,
  user: userReducer,
  [api.reducerPath]: api.reducer,
});

export type RootState = ReturnType<typeof reducer>;

export const initialState: Partial<RootState> = {
  user: userInitialState,
};
