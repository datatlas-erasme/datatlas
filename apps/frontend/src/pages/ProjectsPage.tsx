import React from 'react';
import { useSelector } from 'react-redux';
import { ProjectList } from '../components/ProjectList';
import { useGetSavedProjectsQuery } from '../api';
import { StartNewProjectForm } from '../components/forms/StartNewProjectForm';
import { startNewProject } from '../store/reducers/app/drafts';
import { selectCurrentUserProjects } from '../store/selectors';
import { useAppDispatch } from '../store';

export const ProjectsPage = () => {
  const { isLoading, isSuccess, isError, error } = useGetSavedProjectsQuery();
  const projects = useSelector(selectCurrentUserProjects);
  const dispatch = useAppDispatch();

  return (
    <React.StrictMode>
      <main>
        <h1>Projects</h1>
        <ProjectList projects={projects} isLoading={isLoading} isSuccess={isSuccess} isError={isError} error={error} />
        <StartNewProjectForm onSubmit={(data) => dispatch(startNewProject(data))} />
      </main>
    </React.StrictMode>
  );
};
