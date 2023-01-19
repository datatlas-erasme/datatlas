import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DraftProjectInterface, Project } from '@datatlas/shared/models';
import { EntityState } from '@reduxjs/toolkit/src/entities/models';
import { StartNewProjectFormData } from '../../../components/forms/StartNewProjectForm';

export const adapter = createEntityAdapter<DraftProjectInterface>();

export type DraftsState = EntityState<DraftProjectInterface>;

export const initialState: DraftsState = adapter.getInitialState();

const slice = createSlice({
  name: 'drafts',
  initialState,
  reducers: {
    projectAdded: adapter.addOne,
    startNewProject(state, action: PayloadAction<StartNewProjectFormData>) {
      adapter.addOne(state, Project.createDraft({ ...action.payload, ownerId: 1 }));
    },
    projectsReceived(state, action) {
      adapter.setAll(state, action.payload);
    },
  },
});

export const { reducer } = slice;

export const { projectAdded, projectsReceived, startNewProject } = slice.actions;
