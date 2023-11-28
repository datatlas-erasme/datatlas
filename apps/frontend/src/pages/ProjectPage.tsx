import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { Project } from '@datatlas/models';
import KeplerMap from '../components/KeplerMap';
import { getUser, useGetProjectQuery } from '../store/api';
import { Loader } from '../components/Loader';
import { selectCurrentUserId } from '../store/selectors';
import { ErrorComponent } from '../components/ErrorComponent';

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const ProjectPage = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error('Project not found.');
  }

  const currentUserId = useSelector(selectCurrentUserId);
  const {
    isLoading: isUserLoading,
    isFetching: isUserFetching,
    data: user,
    isError: isUserError,
    error: userError,
  } = getUser.useQuery(currentUserId ?? skipToken);
  if (isUserError) {
    console.error(userError);
  }

  const {
    isLoading: isProjectLoading,
    isFetching: isProjectFetching,
    isError,
    error,
    data: project,
  } = useGetProjectQuery(+id ?? skipToken);
  const isLoading = isUserLoading || isUserFetching || isProjectLoading || isProjectFetching;

  if (isLoading) {
    return (
      <MapContainer>
        <Loader dark fullscreen />
      </MapContainer>
    );
  } else if (isError) {
    return <ErrorComponent error={error} />;
  }

  return (
    <MapContainer>
      <KeplerMap id={id} readOnly={!Project.canProjectDtoBeEditedBy(project, user)} />
    </MapContainer>
  );
};
