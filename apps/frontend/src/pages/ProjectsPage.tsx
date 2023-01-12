import React from 'react';
import { useSelector } from 'react-redux';
import { projectsSelectors } from '../store/selectors';

export const ProjectsPage = () => {
  const projects = useSelector(projectsSelectors.selectAll);
  return (
    <main>
      <h1>Projects</h1>
      {projects.map(({ id, name }) => (
        <article key={id}>
          <h2>{name}</h2>
        </article>
      ))}
    </main>
  );
};
