/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REHYDRATE } from 'redux-persist';
import { GetUserDto, LoginResponse, ProjectDto, UpdateProjectRequestInterface } from '@datatlas/dtos';
import { CreateProjectFormData, LoginFormData } from '../models';
import { loggedIn } from './reducers/user';
import { KeplerMapStyle, Project } from '@datatlas/models';
import { selectAccessToken } from './selectors';

const prepareHeaders = (headers, { getState }) => {
  headers.set('Content-Type', 'application/json');

  // @ts-ignore
  const accessToken = selectAccessToken(getState());
  if (accessToken) {
    headers.set('authorization', `Bearer ${accessToken}`);
    headers.set('Content-Type', 'application/json');
  }

  return headers;
};

// Define cache "tags" :
// https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tags
const tagTypes = ['Auth', 'Projects', 'Users'] as const;
type TagType = (typeof tagTypes)[number];
const projectListTag = { type: tagTypes['Projects'], id: 0 };
const createTag = ({ id, type }: { id: number; type: TagType }) => ({ type, id });
const createProjectTag = ({ id }: { id: number }) => createTag({ id, type: tagTypes['Projects'] });
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL || '/api/',
    mode: 'cors',
    prepareHeaders,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload?.[reducerPath];
    }
  },
  endpoints: () => ({}),
  tagTypes,
})
  .injectEndpoints({
    endpoints: (builder) => ({
      login: builder.mutation<LoginResponse, LoginFormData>({
        query(data) {
          return {
            url: '/auth/login',
            method: 'POST',
            body: data,
          };
        },
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            await dispatch(loggedIn(data));
            await dispatch(getUser.initiate(data.user_id));
          } catch (error) {
            console.error(error);
            // dispatch an error notification
          }
        },
      }),
    }),
    overrideExisting: false,
  })
  .enhanceEndpoints({ addTagTypes: [tagTypes['Projects']] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getProjects: builder.query<ProjectDto[], void>({
        query: () => '/projects',
        providesTags: (projects) =>
          projects ? projects.map(createProjectTag).concat([projectListTag]) : [projectListTag],
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            data.map(({ ownerId }) => dispatch(getUser.initiate(ownerId)));
          } catch (error) {
            console.error(error);
            // dispatch an error notification
          }
        },
        // onCacheEntryAdded: () => {},
      }),
      getProject: builder.query<ProjectDto, number>({
        query: (id) => `/projects/${id}`,
        providesTags: (projectDto) => (projectDto ? [createProjectTag(projectDto)] : []),
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            const {
              data: { ownerId, contributorsIds },
            } = await queryFulfilled;
            dispatch(getUser.initiate(ownerId));
            contributorsIds.forEach((contributorId) => dispatch(getUser.initiate(contributorId)));
          } catch (error) {
            console.error(error);
            // dispatch an error notification
          }
        },
      }),
      createProject: builder.mutation<ProjectDto, CreateProjectFormData>({
        query: (data) => ({
          url: `/projects`,
          method: 'POST',
          body: {
            ...data,
            config: {
              ...data.config,
              mapStyle: new KeplerMapStyle({
                mapboxApiAccessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
                styleType: data.mapStyleId,
              }),
            },
          },
        }),
        invalidatesTags: ['Projects', projectListTag],
        async onQueryStarted({ mapStyleId }, { dispatch, queryFulfilled, getState }) {
          const { data } = await queryFulfilled;
          // @todo Creating a project dto should not return an owner object.

          const projectDto = {
            ...data,
            // @ts-ignore
            owner: data?.owner?.id,
          };

          // Force update of the `getProjects` cache entry.
          dispatch(
            api.util.updateQueryData('getProjects', undefined, (projects) => {
              projects.push(projectDto);
              projects.sort(Project.getSortingFunction());
            })
          );
        },
      }),
      updateProject: builder.mutation<ProjectDto, UpdateProjectRequestInterface>({
        query: (body) => ({
          url: `/projects/${body.id}`,
          method: 'PUT',
          body,
        }),
        invalidatesTags: (result, error, updateProjectRequest) => [
          projectListTag,
          // Logic would want we invalidate the cache here, but it causes another GET /project/{id} request which reload the project.
          // createProjectTag(updateProjectRequest)
        ],
      }),
      publishProject: builder.mutation<ProjectDto, UpdateProjectRequestInterface>({
        query: (body) => ({
          url: `/projects/${body.id}`,
          method: 'PUT',
          body,
        }),
        invalidatesTags: [projectListTag],
      }),
      deleteProject: builder.mutation<void, ProjectDto['id']>({
        query: (id) => ({
          url: `/projects/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (result, error, id) => [projectListTag, createProjectTag({ id })],
      }),
    }),
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUser: builder.query<GetUserDto, number>({
        query: (id: number) => ({
          url: `/users/${id}`,
          credentials: 'include',
        }),
      }),
      getUsers: builder.query<GetUserDto[], void>({
        query: () => '/users',
      }),
    }),
  });

export const {
  useLoginMutation,
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useGetUsersQuery,
  useUpdateProjectMutation,
} = api;
export const { getUser, getProjects, getProject, updateProject, deleteProject } = api.endpoints;
