import React from 'react';
import styled from 'styled-components';
import { ProjectListItem } from './ProjectListItem';
import { Loader } from './Loader';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { ProjectInterface } from '@datatlas/models';

export interface ProjectListProps {
  data?: ProjectInterface[];
  isLoading: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  isError: boolean;
  error?: FetchBaseQueryError | SerializedError;
}

const ContainerProjectList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const ProjectList = ({ data, isLoading, isFetching, isSuccess, isError, error }: ProjectListProps) => {
  let content;
  if (isLoading || isFetching) {
    content = <Loader />;
  } else if (isSuccess) {
    content = data ? data.map((project) => <ProjectListItem key={project.id} {...project} />) : [];
  } else if (isError && error) {
    content = <div>{error.toString()}</div>;
  }

  return <ContainerProjectList>{content}</ContainerProjectList>;
};
