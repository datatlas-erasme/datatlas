import React from 'react';
import { useParams } from 'react-router-dom';
import KeplerMap from '../components/KeplerMap';

export const ProjectPage = () => {
  const { id } = useParams();

  if (!id) {
    throw new Error('404');
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <KeplerMap id={id} />
    </div>
  );
};
