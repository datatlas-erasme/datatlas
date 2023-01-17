import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ProjectInterface } from '@datatlas/shared/models';
import { EntityState } from '@reduxjs/toolkit/src/entities/models';

export const adapter = createEntityAdapter<ProjectInterface>();

export type ProjectsState = EntityState<ProjectInterface>;

export const initialState: ProjectsState = adapter.getInitialState({
  ids: [1],
  entities: {
    1: {
      id: 1,
      name: 'Dummy project',
    },
  },
});

const slice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    projectAdded: adapter.addOne,
    projectsReceived(state, action) {
      adapter.setAll(state, action.payload);
    },
  },
});

export const { reducer } = slice;
