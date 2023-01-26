import React from 'react';
import ProjectCard from './card/ProjectCard';
import { NormalizedProjectInterface } from '@datatlas/shared/models';

export type ProjectListItemProps = NormalizedProjectInterface;

export const ProjectListItem = ({ id, name, draft, updatedDate }: ProjectListItemProps) => {
  return <ProjectCard id={id} name={name} draft={draft} datasets={[]} ownerId={4} updatedDate={updatedDate} />;
};
