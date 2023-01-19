import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProjectInterface } from '@datatlas/shared/models';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getProjects: builder.query<ProjectInterface[], void>({
      query: () => '/projects',
    }),
  }),
});

export const { useGetProjectsQuery } = api;
