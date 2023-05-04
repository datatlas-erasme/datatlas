import { combineReducers } from '@reduxjs/toolkit';
import { reducer as userReducer, initialState as userInitialState } from './user';
import { reducer as keplerReducer } from './keplerGl';
import { reducer as localeReducer, initialState as localeInitialState } from './locale';
import { api } from '../api';

export const reducer = combineReducers({
  keplerGl: keplerReducer,
  locale: localeReducer,
  user: userReducer,
  [api.reducerPath]: api.reducer,
});

export type RootState = ReturnType<typeof reducer>;

export const initialState: Partial<RootState> = {
  user: userInitialState,
  locale: localeInitialState,
};
