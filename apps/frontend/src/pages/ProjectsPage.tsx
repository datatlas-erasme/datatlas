import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../style/theme';
import { useSelector } from 'react-redux';
import { ProjectList } from '../components/ProjectList';
import { useGetSavedProjectsQuery } from '../api';
import { StartNewProjectForm } from '../components/forms/StartNewProjectForm';
import { startNewProject } from '../store/reducers/app/drafts';
import { selectCurrentUserProjects } from '../store/selectors';
import { useAppDispatch } from '../store';
import Footer from '../components/footer/footer';
import Sidebar from '../components/sidebar/Sidebar';
import Navbar from '../components/nav/Navbar';

const LayoutProjects = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 0.2fr 1fr 0.5fr 0.5fr;
  grid-template-areas:
    'nav nav nav nav'
    'main main main aside'
    'footer footer footer footer';
  grid-gap: 0.25rem;
  transition: all 0.25s ease-in-out;
`;

const ProjectsContainer = styled.main`
  grid-area: main;
  padding: ${(props) => props.theme.layoutsBoxContainer};
`;

export const ProjectsPage = () => {
  const { isLoading, isSuccess, isError, error } = useGetSavedProjectsQuery();
  const projects = useSelector(selectCurrentUserProjects);
  const dispatch = useAppDispatch();

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <LayoutProjects>
          <Navbar />
          <ProjectsContainer>
            <h1>Projects</h1>
            <ProjectList
              projects={projects}
              isLoading={isLoading}
              isSuccess={isSuccess}
              isError={isError}
              error={error}
            />
          </ProjectsContainer>
          <Sidebar>
            <StartNewProjectForm onSubmit={(data) => dispatch(startNewProject(data))} />
          </Sidebar>
          <Footer />
        </LayoutProjects>
      </ThemeProvider>
    </React.StrictMode>
  );
};
