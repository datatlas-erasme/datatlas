import React from 'react';
import ProjectCard from './card/ProjectCard';
import { NormalizedProjectInterface } from '@datatlas/shared/models';

export type ProjectListItemProps = NormalizedProjectInterface;

export const ProjectListItem = (props: ProjectListItemProps) => {
  return <ProjectCard {...props} />;
};
