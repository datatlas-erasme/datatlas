import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProjectInterface, UserInterface } from '@datatlas/shared/models';
import { loggedIn } from './store/reducers/app/user';
import { LoginFormData } from './components/forms/LoginForm';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getSavedProjects: builder.query<ProjectInterface[], void>({
      query: () => '/projects',
    }),
    getUser: builder.query({
      query: (id) => `/users/${id}`,
    }),
    login: builder.mutation<UserInterface, LoginFormData>({
      query(data) {
        return {
          url: 'login',
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(loggedIn(data));
        } catch (error) {
          console.error(error);
          // dispatch an error notification
        }
      },
    }),
  }),
});

export const { useGetSavedProjectsQuery, useLoginMutation } = api;
