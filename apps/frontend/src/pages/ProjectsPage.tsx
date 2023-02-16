import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useGetSavedProjectsQuery } from '../api';
import { selectCurrentUserProjects } from '../store/selectors';
import { ProjectList } from '../components/ProjectList';
import Sidebar from '../components/sidebar/Sidebar';
import { DisplayButton } from '../components/buttons';

const LayoutProjects = styled.div`
  display: flex;
  margin: auto;
  height: 70vh;
`;

const ProjectsContainer = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 70vw;
  align-items: center;
  padding: ${(props) => props.theme.layoutsBoxContainer};
  background-color: ${(props) => props.theme.layoutBGColor};
`;

export const ProjectsPage = () => {
  const { isLoading, isSuccess, isError, error } = useGetSavedProjectsQuery();
  const projects = useSelector(selectCurrentUserProjects);

  return (
    <React.StrictMode>
      <LayoutProjects>
        <ProjectsContainer>
          <h2>Mes Projets</h2>
          <DisplayButton>Voir tous</DisplayButton>
          <ProjectList
            projects={projects}
            isLoading={isLoading}
            isSuccess={isSuccess}
            isError={isError}
            error={error}
          />
        </ProjectsContainer>
        <Sidebar />
      </LayoutProjects>
    </React.StrictMode>
  );
};
