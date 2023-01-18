import React from 'react';
import { ProjectListItem } from './ProjectListItem';
import { Loader } from './Loader';
import {ProjectInterface} from "@datatlas/shared/models";
import {UseQueryStateResult} from "@reduxjs/toolkit/dist/query/react/buildHooks";

export type ProjectListProps = UseQueryStateResult<any, any>;
export const ProjectList = ({ projects, isLoading, isSuccess, isError, error }) => {
  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    content = projects.map((project) => <ProjectListItem {...project} />);
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return <div>{content}</div>;
};
