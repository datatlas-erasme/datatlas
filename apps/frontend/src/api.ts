import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { adapter as projectsAdapter } from './store/reducers/app/projects';
import { ProjectInterface } from '@datatlas/shared/models';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getProjects: builder.query<ProjectInterface[], void>({
      query: () => '/projects',
      transformResponse: (response: ProjectInterface[]) => {
        return projectsAdapter.setAll(projectsAdapter.getInitialState(), response);
      },
    }),
  }),
});

export const { useGetProjectsQuery } = api;
