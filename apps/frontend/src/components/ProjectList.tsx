import React from 'react';
import { ProjectListItem } from './ProjectListItem';
import { Loader } from './Loader';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ProjectInterface } from '@datatlas/shared/models';
import { SerializedError } from '@reduxjs/toolkit';

export interface ProjectListProps {
  projects: ProjectInterface[];
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
    content = projects.map((project) => <ProjectListItem key={project.id} {...project} />);
  } else if (isError && error) {
    content = <div>{error.toString()}</div>;
  }

  return <div>{content}</div>;
};
