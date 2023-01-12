import { combineReducers } from '@reduxjs/toolkit';
import { ProjectsState, reducer as projectsReducer, initialState as projectsInitialState } from './projects';

export interface AppState {
  projects: ProjectsState;
}

export const initialState: AppState = {
  projects: projectsInitialState,
};
export const reducer = combineReducers({
  projects: projectsReducer,
});
