import React from 'react';
import ProjectCard from './card/ProjectCard';
import { Link } from 'react-router-dom';
import { NormalizedProjectInterface } from '@datatlas/shared/models';

export type ProjectListItemProps = NormalizedProjectInterface;

export const ProjectListItem = ({ id, name, draft }: ProjectListItemProps) => {
  return <ProjectCard id={id} name={name} draft={draft} datasets={[]} ownerId={4} />;
};
