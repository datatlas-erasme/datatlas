import React, { useState } from 'react';
import styled from 'styled-components';
import { ProjectListItem } from './ProjectListItem';
import { Loader } from './Loader';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { deleteEntry } from 'kepler.gl/actions';
import { LoadingProjectInterface, ProjectInterface } from '@datatlas/models';
import { DeleteProjectModal } from './DeleteProjectModal';
import { useAppDispatch } from '../store';
import { toKeplerId } from '../store/selectors';

export interface ProjectListProps {
  data?: LoadingProjectInterface[];
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
  const [deletingProject, setDeletingProject] = useState<LoadingProjectInterface | null>(null);
  const dispatch = useAppDispatch();

  const handleDelete = (id: ProjectInterface['id']) => {
    dispatch(deleteEntry(toKeplerId(id)));
  };

  let content;
  if (isLoading || isFetching) {
    content = <Loader dark />;
  } else if (isSuccess) {
    content = data
      ? data.map((project) => (
          <ProjectListItem key={project.id} project={project} onRemoveButtonClicked={setDeletingProject} />
        ))
      : [];
  } else if (isError && error) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <>
      <ContainerProjectList>{content}</ContainerProjectList>
      <DeleteProjectModal project={deletingProject} onDelete={handleDelete} setDeletingProject={setDeletingProject} />
    </>
  );
};
