import React from 'react';
import { LoadingProjectInterface } from '@datatlas/models';
import ProjectCard from './card/ProjectCard';

export type ProjectListItemProps = LoadingProjectInterface;

export const ProjectListItem = (props: ProjectListItemProps) => {
  return <ProjectCard {...props} />;
};
