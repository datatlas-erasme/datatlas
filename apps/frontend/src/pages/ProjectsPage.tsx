import React from 'react';
import { useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../style/theme';
import { useGetSavedProjectsQuery } from '../api';
import { selectCurrentUserProjects } from '../store/selectors';
import { ProjectList } from '../components/ProjectList';
import Footer from '../components/footer/footer';
import Sidebar from '../components/sidebar/Sidebar';
import Navbar from '../components/nav/Navbar';
import { DisplayButton } from '../components/buttons/DisplayButton';

const LayoutProjects = styled.div`
  display: grid;
  height: 100vh;
  margin: auto;
  grid-template-rows: 0.2fr 1fr 0.5fr 0.5fr;
  grid-template-areas:
    'nav nav nav nav'
    'main main main aside'
    'footer footer footer footer';
  transition: all 0.25s ease-in-out;
`;

const ProjectsContainer = styled.main`
  grid-area: main;
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
      <ThemeProvider theme={theme}>
        <LayoutProjects>
          <Navbar />
          <ProjectsContainer>
            <h1>Mes Projets</h1>
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
          <Footer />
        </LayoutProjects>
      </ThemeProvider>
    </React.StrictMode>
  );
};
