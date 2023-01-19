import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './reducers';
import { adapter as draftsAdapter } from './reducers/app/drafts';
import { api } from '../api';

const selectState = (state: RootState) => state;

const selectKeplerState = createSelector(selectState, (state) => state.keplerGl);
export const selectLocale = createSelector(selectKeplerState, (state) => state?.uiState?.locale || 'en');

const selectAppState = createSelector(selectState, (state) => state.app);
const selectDraftsState = createSelector(selectAppState, (state) => state.drafts);
export const draftsSelectors = draftsAdapter.getSelectors(selectDraftsState);

export const selectAllSavedProjects = api.endpoints.getSavedProjects.select();
export const selectSavedProjectById = createSelector(
  selectAllSavedProjects,
  (state, projectId) => projectId,
  (projects, projectId) => projects.find((project) => project.id === projectId)
);

export const selectSavedProjectsByOwnerId = createSelector(
  selectAllSavedProjects,
  (state, ownerId) => ownerId,
  (result, ownerId) => {
    console.log('result', result);
    const { data } = result;
    if (data) {
      return data.filter((project) => project.ownerId === ownerId);
    }
    return [];
  }
);

export const selectUserById = (state, id) => api.endpoints.getUser.select(id)(state)?.data ?? {};
const selectCurrentUserId = createSelector(selectAppState, (state) => state.user);
const selectCurrentUser = createSelector(selectState, selectCurrentUserId, (state, userId) =>
  selectUserById(state, userId)
);

const selectCurrentUserSavedProjects = createSelector(selectState, selectCurrentUser, (state, currentUser) =>
  selectSavedProjectsByOwnerId(state, currentUser.id)
);

export const selectCurrentUserProjects = createSelector(
  [selectCurrentUser, selectCurrentUserSavedProjects, draftsSelectors.selectAll],
  (currentUser, savedProjects, drafts) => {
    return savedProjects.concat(
      drafts.map((draft) => ({
        ...draft,
        owner: currentUser,
      }))
    );
  }
);
