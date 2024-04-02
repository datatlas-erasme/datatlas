import { createSelector } from 'reselect';
import { VisState, ProjectInterface, DatatlasGlInstances } from '@datatlas/models';
import { RootState } from './reducers';
import { getUser, getProjects } from './api';
import { projectFactory } from '../kepler';

export const toKeplerId = (id: string | number) => String(id).toLocaleUpperCase();

export const selectInstance = createSelector(
  [(state: RootState) => state.keplerGl, (_state: RootState, instanceId?: string) => instanceId],
  (state: DatatlasGlInstances, instanceId?: string) => (instanceId ? state[instanceId] : undefined)
);

export const selectInstanceVisState = createSelector(selectInstance, (instance) => instance?.visState);

export const selectInstanceMapInfo = createSelector(selectInstanceVisState, (visState) => visState?.mapInfo);

const DEFAULT_FILE_FORMATS = ['CSV', 'Json', 'GeoJSON', 'Arrow'];

const getFileFormatNames = createSelector(
  (state?: VisState) => state?.loaders || [],
  (loaders) => [...DEFAULT_FILE_FORMATS, ...loaders.map((loader) => loader.name)]
);

export const selectFileFormatNamesByInstanceId = createSelector(selectInstanceVisState, getFileFormatNames);

export const selectFilters = createSelector(selectInstanceVisState, (visState) => visState?.filters || []);

export const selectIsDraft = (state: RootState, instanceId: string) => {
  const mapInfo = selectInstanceMapInfo(state, instanceId);

  return mapInfo?.draft;
};

export const selectFiltersConfig = createSelector(
  selectInstanceVisState,
  (visState) => visState?.interactionConfig?.filters
);

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

export const selectProjectById = (state: RootState, projectId?: string) => {
  if (!projectId) {
    return;
  }

  const instance = selectInstance(state, projectId);
  if (!instance) {
    return;
  }

  const { ownerId, contributorsIds } = instance.visState.mapInfo;
  const user = selectUserById(state, ownerId);
  const contributors = selectUsersByIds(state, contributorsIds);

  return projectFactory.createProjectFromKeplerInstance(projectId, instance, contributors, user);
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

export const selectCurrentUser = (state: RootState) => {
  return selectUserById(state, state.user.id);
};

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
