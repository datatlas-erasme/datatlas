import React from 'react';
import { ProjectListItem } from './ProjectListItem';
import { Loader } from './Loader';
import { ProjectInterface } from '@datatlas/shared/models';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export interface ProjectListProps {
  projects?: ProjectInterface[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: FetchBaseQueryError | SerializedError;
}
export const ProjectList = ({ projects, isLoading, isSuccess, isError, error }: ProjectListProps) => {
  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess && projects) {
    content = projects.map((project) => <ProjectListItem {...project} />);
  } else if (isError && error) {
    content = <div>{error.toString()}</div>;
  }

  return <div>{content}</div>;
};
