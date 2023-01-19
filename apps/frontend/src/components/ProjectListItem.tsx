import React from 'react';
import { Link } from 'react-router-dom';
import { NormalizedProjectInterface } from '@datatlas/shared/models';

export type ProjectListItemProps = NormalizedProjectInterface;

export const ProjectListItem = ({ id, name, draft }: ProjectListItemProps) => {
  return (
    <article key={id}>
      <h2>{name}</h2>
      {draft && <h3>Draft</h3>}
      <Link to={`/projects/${id}`}>Voir le projet</Link>
    </article>
  );
};
