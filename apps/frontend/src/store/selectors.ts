import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './reducers';
import { api } from '../api';
import { Project, ProjectInterface, MapInfoInterface } from '@datatlas/models';
import { KeplerGlState } from 'kepler.gl/reducers';

const selectState = (state: RootState) => state;

export const selectKeplerState = (state: RootState) => state.keplerGl;
export const selectKeplerInstanceById = (state: RootState, instanceId: ProjectInterface['id']) =>
  state.keplerGl[instanceId];
export const isFileLoading = (state: RootState, instanceId: ProjectInterface['id']) =>
  selectKeplerInstanceById(state, instanceId).visState.fileLoading;
export const selectMapInfoFromKeplerGlState = (state: KeplerGlState) => {
  return state.visState.mapInfo as MapInfoInterface;
};

export const selectLocale = createSelector(selectKeplerState, (state) => state?.uiState?.locale || 'en');

export const selectProjectById = (state: RootState, projectId) => {
  const keplerState = selectKeplerInstanceById(state, projectId);
  const { ownerId } = selectMapInfoFromKeplerGlState(keplerState);
  const user = ownerId ? selectUserById(state, ownerId) : undefined;

  return Project.createProjectFromKeplerInstance(projectId, keplerState, user);
};

export const selectProjects = (state: RootState) => {
  const keplerState = selectKeplerState(state);
  return Object.keys(keplerState).map((id) => selectProjectById(state, id));
};

export const selectProjectsByOwnerId = createSelector(
  selectProjects,
  (state, ownerId) => ownerId,
  (result, ownerId) => {
    const { data } = result;
    if (data) {
      return data.filter((project) => project.ownerId === ownerId);
    }
    return [];
  }
);

export const selectUserById = (state, id) => api.endpoints.getUser.select(id)(state)?.data ?? {};
export const selectCurrentUserId = (state: RootState) => state.user;

export const selectCurrentUserProjects = createSelector(selectState, selectCurrentUserId, (state, currentUserId) =>
  selectProjects(state)
);
