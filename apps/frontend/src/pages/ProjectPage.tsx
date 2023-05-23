import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/query/react';
import KeplerMap from '../components/KeplerMap';
import { getUser, useGetProjectQuery } from '../store/api';
import { Loader } from '../components/Loader';
import { selectCurrentUserId } from '../store/selectors';
import { Project } from '@datatlas/models';

export const ProjectPage = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error('Project not found.');
  }

  const currentUserId = useSelector(selectCurrentUserId);
  const { data: user, isError: isUserError, error: userError } = getUser.useQuery(currentUserId ?? skipToken);
  if (isUserError) {
    console.error(userError);
  }

  const { isLoading, isFetching, isError, error, data: project } = useGetProjectQuery(+id ?? skipToken);
  if (isLoading || isFetching) {
    return <Loader />;
  } else if (isError) {
    console.error(error);
    return <div>{error.toString()}</div>;
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <KeplerMap id={id} readOnly={!project || (project && !Project.canEdit({ ownerId: project.owner }, user))} />
    </div>
  );
};
