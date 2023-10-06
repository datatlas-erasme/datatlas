import React from 'react';
import { LoadingProjectInterface, UserInterface } from '@datatlas/models';
import ProjectCard from './card/ProjectCard';

export interface ProjectListItemProps {
  project: LoadingProjectInterface;
  user?: UserInterface;
  onRemoveButtonClicked: (project: LoadingProjectInterface) => void;
}

export const ProjectListItem = (props: ProjectListItemProps) => {
  return <ProjectCard {...props} />;
};
