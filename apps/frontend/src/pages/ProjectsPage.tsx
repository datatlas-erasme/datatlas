import React from 'react';
import { ProjectList } from '../components/ProjectList';
import { useGetProjectsQuery } from '../api';

export const ProjectsPage = () => {
  const { data: projects, isLoading, isSuccess, isError, error } = useGetProjectsQuery();

  return (
    <main>
      <h1>Projects</h1>
      <ProjectList projects={projects} isLoading={isLoading} isSuccess={isSuccess} isError={isError} error={error} />
    </main>
  );
};
