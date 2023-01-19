import { combineReducers } from '@reduxjs/toolkit';
import { reducer as draftsReducer, initialState as draftsInitialState } from './drafts';
import { reducer as userReducer } from './user';

export const reducer = combineReducers({
  drafts: draftsReducer,
  user: userReducer,
});

export type AppState = ReturnType<typeof reducer>;

export const initialState: AppState = {
  drafts: draftsInitialState,
  user: null,
};
