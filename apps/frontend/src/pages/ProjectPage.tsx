import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import KeplerMap from '../components/KeplerMap';
import { selectProjectById } from '../store/selectors';
import { RootState } from '../store/reducers';

export const ProjectPage = () => {
  const { id } = useParams();
  const project = useSelector<RootState>((state) => selectProjectById(state, id));
  console.log('project', project);

  if (!id) {
    throw new Error('404');
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <KeplerMap id={id} />
    </div>
  );
};
