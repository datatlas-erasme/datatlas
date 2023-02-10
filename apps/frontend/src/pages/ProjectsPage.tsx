import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useGetSavedProjectsQuery } from '../api';
import { selectCurrentUserProjects } from '../store/selectors';
import { ProjectList } from '../components/ProjectList';
import Sidebar from '../components/sidebar/Sidebar';
import { DisplayButton } from '../components/buttons/DisplayButton';
import { TitleH2 } from '../style/theme';

const LayoutProjects = styled.div`
  display: grid;
  margin: auto;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr 0.5fr;
  transition: all 0.25s ease-in-out;
`;

const ProjectsContainer = styled.main`
  grid-column: 1;
  grid-row: 1 / 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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
          <TitleH2>Mes Projets</TitleH2>
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
