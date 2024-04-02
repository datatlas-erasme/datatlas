import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../store/reducers';
import styled from 'styled-components';
import { skipToken } from '@reduxjs/toolkit/query/react';
import KeplerMap from '../components/KeplerMap';
import { getUser, useGetProjectQuery } from '../store/api';
import { Loader } from '../components/Loader';
import { selectCurrentUserId, selectProjectById } from '../store/selectors';
import { ErrorComponent } from '../components/ErrorComponent';
import { useProjectModalState } from '../components/layouts';
import { UpdateProjectModal } from '../components/modals/UpdateProjectModal';

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
`;

export const ProjectPage = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error('Project not found.');
  }

  const { projectModalOpen, setProjectModalOpen } = useProjectModalState();

  const currentUserId = useAppSelector(selectCurrentUserId);
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
  } = useGetProjectQuery(+id ?? skipToken);
  const isLoading = isUserLoading || isUserFetching || isProjectLoading || isProjectFetching;
  // selectProjectsWithContributors
  const project = useAppSelector((state) => selectProjectById(state, id));

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
      <KeplerMap id={id} project={project} user={user} />
      {project && <UpdateProjectModal project={project} setOpen={setProjectModalOpen} open={projectModalOpen} />}
    </MapContainer>
  );
};
