import React from 'react';
import { LoadingProjectInterface, PublicUserInterface } from '@datatlas/models';
import ProjectCard from './card/ProjectCard';

export interface ProjectListItemProps {
  project: LoadingProjectInterface;
  user?: PublicUserInterface;
  onRemoveButtonClicked: (project: LoadingProjectInterface) => void;
}

export const ProjectListItem = (props: ProjectListItemProps) => {
  return <ProjectCard {...props} />;
};
