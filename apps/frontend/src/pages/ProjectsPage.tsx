import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { projectsSelectors } from '../store/selectors';

export const ProjectsPage = () => {
  const projects = useSelector(projectsSelectors.selectAll);
  return (
    <main>
      <h1>Projects</h1>
      {projects.map(({ id, name }) => (
        <article key={id}>
          <h2>{name}</h2>
          <Link to={`/projects/${id}`}>Voir le projet</Link>
        </article>
      ))}
    </main>
  );
};
