import { RootState } from './reducers';
import { getUser } from './api';
import { MapInfoInterface, Project, ProjectInterface } from '@datatlas/models';
import { KeplerGlState } from 'kepler.gl/reducers';
import { createSelector } from 'reselect';

export const toKeplerId = (id: number) => String(id).toLocaleUpperCase();

export const selectKeplerInstanceById = (state: RootState, instanceId: ProjectInterface['id']) =>
  state.keplerGl[toKeplerId(instanceId)];
export const isFileLoading = (state: RootState, instanceId: ProjectInterface['id']) =>
  selectKeplerInstanceById(state, instanceId).visState.fileLoading;
export const selectMapInfoFromKeplerGlState = (state: KeplerGlState) => {
  return state.visState?.mapInfo as MapInfoInterface;
};

export const selectLocale = (state: RootState) => state.locale;

export const selectProjects = (state: RootState) => {
  return Object.keys(state.keplerGl)
    .map((id) => selectProjectById(state, id))
    .filter((project) => project) as ProjectInterface[];
};

export const selectProjectById = (state: RootState, projectId) => {
  const keplerState = selectKeplerInstanceById(state, projectId);
  if (!keplerState) {
    return null;
  }

  const { ownerId } = selectMapInfoFromKeplerGlState(keplerState);
  const user = ownerId ? selectUserById(state, ownerId) : undefined;
  if (!user) {
    console.warn(`User ${ownerId} isn't loaded yet.`);
  }

  return Project.createProjectFromKeplerInstance(projectId, keplerState, user);
};

export const selectUserById = (state, id) => getUser.select(id)(state)?.data;

export const selectCurrentUserId = (state: RootState) => state.user.id;

export const selectLoggedIn = (state: RootState) => !!selectCurrentUserId(state);

export const selectAccessToken = (state: RootState) => state.user.accessToken;

export const selectMyProjects = createSelector(selectProjects, selectCurrentUserId, (projects, currentUserId) =>
  projects.filter(({ owner }) => owner?.id === currentUserId)
);

export const selectCommunityProjects = createSelector(selectProjects, selectCurrentUserId, (projects, currentUserId) =>
  projects.filter(({ owner }) => owner?.id !== currentUserId)
);
