import React from 'react';
import { useParams } from 'react-router-dom';
import KeplerMap from '../components/KeplerMap';
import { useGetProjectQuery } from '../store/api';
import { Loader } from '../components/Loader';

export const ProjectPage = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error('404');
  }

  const { isLoading, isFetching, isError, error } = useGetProjectQuery(+id);

  if (isLoading || isFetching) {
    return <Loader />;
  } else if (isError) {
    console.error(error);
    return <div>{error.toString()}</div>;
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <KeplerMap id={id} />
    </div>
  );
};
