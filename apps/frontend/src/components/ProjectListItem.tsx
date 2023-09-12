import React from 'react';
import { LoadingProjectInterface } from '@datatlas/models';
import ProjectCard from './card/ProjectCard';

export interface ProjectListItemProps {
  project: LoadingProjectInterface;
  onRemoveButtonClicked: (project: LoadingProjectInterface) => void;
}

export const ProjectListItem = (props: ProjectListItemProps) => {
  return <ProjectCard {...props} />;
};
