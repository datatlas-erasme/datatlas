import React, { createRef, useRef } from 'react';
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
import { MapControlRefContext } from '../components/context/MapControlRefContext';

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
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapControlRef = createRef<HTMLDivElement>();

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
    <MapContainer className="map-container" ref={mapContainerRef}>
      <MapControlRefContext.Provider value={mapControlRef}>
        <KeplerMap
          id={id}
          readOnly={!Project.canProjectDtoBeEditedBy(project, user)}
          mapContainerRef={mapContainerRef}
        />
      </MapControlRefContext.Provider>
    </MapContainer>
  );
};
