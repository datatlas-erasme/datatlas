import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProjectInterface } from '@datatlas/shared/models';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getSavedProjects: builder.query<ProjectInterface[], void>({
      query: () => '/projects',
      transformResponse: (projects: ProjectInterface[]) => {
        // projectsAdapter.upsertMany(projectsInitialState, projects.map(Project.normalize));
        return projects;
      },
    }),
    getUser: builder.query({
      query: (id) => `/users/${id}`,
    }),
  }),
});

export const { useGetSavedProjectsQuery } = api;
