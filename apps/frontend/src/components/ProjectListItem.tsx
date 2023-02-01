import React from 'react';
import ProjectCard from './card/ProjectCard';
import { ProjectInterface } from '@datatlas/shared/models';

export type ProjectListItemProps = ProjectInterface;

export const ProjectListItem = (props: ProjectListItemProps) => {
  return <ProjectCard {...props} />;
};
