import { Filter } from 'kepler.gl';
import { KeplerGlState } from 'kepler.gl/reducers';
import { createSelector } from 'reselect';
import { FiltersConfigInterface, MapInfoInterface, ProjectInterface } from '@datatlas/models';
import { RootState } from './reducers';
import { getUser, getProjects } from './api';
import { projectFactory } from '../kepler';

export const toKeplerId = (id: string | number) => String(id).toLocaleUpperCase();

export const selectKeplerInstanceById = (state: RootState, instanceId?: string | number) =>
  instanceId ? state.keplerGl[instanceId] : {};
export const isFileLoading = (state: RootState, instanceId: string) =>
  selectKeplerInstanceById(state, instanceId).visState.fileLoading;
export const selectMapInfoFromKeplerGlState = (state: KeplerGlState) => {
  return state.visState?.mapInfo as MapInfoInterface;
};

const DEFAULT_FILE_EXTENSIONS = ['csv', 'geojson'];
const DEFAULT_FILE_FORMATS = ['CSV', 'GeoJSON'];

export const selectFileFormatNames = createSelector(
  (state: KeplerGlState) => state.loaders || [],
  (loaders) => [...DEFAULT_FILE_FORMATS, ...loaders.map((loader) => loader.name)]
);

export const selectFileExtensions = createSelector(
  (state: KeplerGlState) => state.loaders,
  (loaders) => [...DEFAULT_FILE_EXTENSIONS, ...loaders.flatMap((loader) => loader.extensions)]
);

export const selectFileFormatNamesByInstanceId = createSelector(selectKeplerInstanceById, selectFileFormatNames);

export const selectFilters = (state: RootState, instanceId: string): Filter[] =>
  selectKeplerInstanceById(state, instanceId).visState.filters;

export const selectIsDraft = (state: RootState, instanceId: string): Filter[] => {
  const keplerState = selectKeplerInstanceById(state, instanceId);
  const mapInfo = selectMapInfoFromKeplerGlState(keplerState);

  return mapInfo?.draft;
};

export const selectFiltersConfig = (state: RootState, instanceId: string): FiltersConfigInterface =>
  selectKeplerInstanceById(state, instanceId).visState.interactionConfig.filters;

export const selectLocale = (state: RootState) => state.locale;

export const selectProjects = (state: RootState) => {
  const projects = getProjects.select()(state)?.data;
  if (projects) {
    return projects
      .map(({ id }) => selectProjectById(state, toKeplerId(id)))
      .filter((project) => project) as ProjectInterface[];
  }

  return [];
};

export const selectProjectById = (state: RootState, projectId: string) => {
  const keplerState = selectKeplerInstanceById(state, projectId);
  if (!keplerState) {
    return;
  }

  const { ownerId, contributorsIds } = selectMapInfoFromKeplerGlState(keplerState);

  const user = selectUserById(state, ownerId);
  const contributors = selectUsersByIds(state, contributorsIds);

  return projectFactory.createProjectFromKeplerInstance(projectId, keplerState, contributors, user);
};

export const selectUserById = (state, id) => {
  const user = getUser.select(id)(state)?.data;
  if (!user) {
    console.warn(`User ${id} isn't loaded yet.`);
  }
  return user;
};

export const selectUsersByIds = (state, ids) =>
  ids.map((id) => getUser.select(id)(state)?.data).filter((user) => !!user);

export const selectCurrentUserId = (state: RootState) => state.user.id;

export const selectLoggedIn = (state: RootState) => !!selectCurrentUserId(state);

export const selectAccessToken = (state: RootState) => state.user.accessToken;

// @todo there should be a dedicated endpoint instead
export const selectMyProjects = createSelector(selectProjects, selectCurrentUserId, (projects, currentUserId) =>
  projects.filter(({ owner }) => owner?.id === currentUserId)
);

// @todo there should be a dedicated endpoint instead
export const selectCommunityProjects = createSelector(selectProjects, selectCurrentUserId, (projects, currentUserId) =>
  projects.filter(({ owner }) => owner?.id !== currentUserId)
);
