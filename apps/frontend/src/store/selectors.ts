import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './reducers';
import { adapter as projectsAdapter } from './reducers/app/projects';

const selectState = (state: RootState) => state;

const selectKeplerState = createSelector(selectState, (state) => state.keplerGl);
export const selectLocale = createSelector(selectKeplerState, (state) => state?.uiState?.locale || 'en');

const selectAppState = createSelector(selectState, (state) => state.app);
const selectProjectsState = createSelector(selectAppState, (state) => state.projects);

export const projectsSelectors = projectsAdapter.getSelectors(selectProjectsState);
