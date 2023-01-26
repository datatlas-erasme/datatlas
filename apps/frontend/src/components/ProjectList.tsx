import React from 'react';
// import { ProjectListItem } from './ProjectListItem';
import ProjectCard from './card/ProjectCard';
import { Loader } from './Loader';
import { DraftProjectInterface, NormalizedProjectInterface } from '@datatlas/shared/models';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export interface ProjectListProps {
  projects: (NormalizedProjectInterface | DraftProjectInterface)[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: FetchBaseQueryError | SerializedError;
}

export const ProjectList = ({ projects, isLoading, isSuccess, isError, error }: ProjectListProps) => {
  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    content = projects.map((project) => <ProjectCard key={project.id} {...project} />);
  } else if (isError && error) {
    content = <div>{error.toString()}</div>;
  }

  return <div>{content}</div>;
};
