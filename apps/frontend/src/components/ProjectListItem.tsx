import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectInterface } from '@datatlas/shared/models';

export type ProjectListItemProps = ProjectInterface;

export const ProjectListItem = ({ id, name }: ProjectListItemProps) => {
  return (
    <article key={id}>
      <h2>{name}</h2>
      <Link to={`/projects/${id}`}>Voir le projet</Link>
    </article>
  );
};
