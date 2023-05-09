import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useGetSavedProjectsQuery } from '../api';
import { selectCurrentUserProjects } from '../store/selectors';
import { ProjectList } from '../components/ProjectList';
import Sidebar from '../components/sidebar/Sidebar';

const LayoutProjects = styled.div`
  display: flex;
  flex: auto;
  width: 100vw;
  overflow: scroll;
  background-color: ${({ theme }) => theme.layoutBGColor};
`;

const ProjectsContainer = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 70vw;
  align-items: center;
  padding: ${({ theme }) => theme.layoutsBoxContainer};
`;

const HeaderProjects = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: ${({ theme }) => theme.cardBoxContainer};
`;

export const ProjectsPage = () => {
  const { isLoading, isSuccess, isError, error } = useGetSavedProjectsQuery();
  const projects = useSelector(selectCurrentUserProjects);

  return (
    <React.StrictMode>
      <LayoutProjects>
        <ProjectsContainer>
          <HeaderProjects>
            <h2>Mes Projets</h2>
          </HeaderProjects>
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
