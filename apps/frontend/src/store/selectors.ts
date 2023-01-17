import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './reducers';
import { adapter as projectsAdapter } from './reducers/app/projects';

const selectState = (state: RootState) => state;
const selectAppState = createSelector(selectState, (state) => state.app);
const selectProjectsState = createSelector(selectAppState, (state) => state.projects);

export const projectsSelectors = projectsAdapter.getSelectors(selectProjectsState);
