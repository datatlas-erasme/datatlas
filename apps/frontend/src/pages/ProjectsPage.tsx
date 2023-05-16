import React from 'react';
import styled from 'styled-components';
import { useGetProjectsQuery } from '../store/api';
import { ProjectList } from '../components/ProjectList';
import Sidebar from '../components/sidebar/Sidebar';
import { selectProjects } from '../store/selectors';
import { useSelector } from 'react-redux';

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
  const { isLoading, isFetching, isSuccess, isError, error } = useGetProjectsQuery();
  const projects = useSelector(selectProjects);

  return (
    <React.StrictMode>
      <LayoutProjects>
        <ProjectsContainer>
          <HeaderProjects>
            <h2>Mes Projets</h2>
          </HeaderProjects>
          <ProjectList
            data={projects}
            isLoading={isLoading}
            isFetching={isFetching}
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
