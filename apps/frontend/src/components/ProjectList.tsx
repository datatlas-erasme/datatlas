import React from 'react';
import { ProjectListItem } from './ProjectListItem';
import { Loader } from './Loader';
import { ProjectInterface } from '@datatlas/models';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import styled from 'styled-components';

export interface ProjectListProps {
  projects: ProjectInterface[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: FetchBaseQueryError | SerializedError;
}

const ContainerProjectList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const ProjectList = ({ projects, isLoading, isSuccess, isError, error }: ProjectListProps) => {
  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    content = projects.map((project) => <ProjectListItem key={project.id} {...project} />);
  } else if (isError && error) {
    content = <div>{error.toString()}</div>;
  }

  return <ContainerProjectList>{content}</ContainerProjectList>;
};
