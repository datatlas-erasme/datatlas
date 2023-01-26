import React from 'react';
import ProjectCard from '../components/card/ProjectCard';
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

const testProjectsDatas = {
  id: 'p012',
  draft: true,
  titleCard: 'Titre de projet',
  infoStatus: 'Modidifié le 6 janvier 2033',
  desc: 'Sed ornare, diam eu dictum pulvinar, elit nisi varius felis, vel accumsan felis erat vel mauris. Nulla consectetur tellus vulputate neque pharetra, sit amet consectetur diam auctor. Praesent imperdiet nisl et vulputate maximus. Etiam viverra consectetur leo, a vehicula odio ornare sed.',
  adminInitial: 'AA',
  editorsNumber: 3,
};

const LayoutProjects = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 0.2fr 1fr 0.5fr 0.5fr;
  grid-template-areas:
    'nav nav nav nav'
    'main main main aside'
    'footer footer footer footer';
  //text-align: center;
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
          <Navbar>NavBar</Navbar>
          <ProjectsContainer>
            <h1>Projects</h1>
            <ProjectList
              projects={projects}
              isLoading={isLoading}
              isSuccess={isSuccess}
              isError={isError}
              error={error}
            />
            {/*<ProjectCard projects={projects} />*/}
          </ProjectsContainer>
          <Sidebar>
            <StartNewProjectForm onSubmit={(data) => dispatch(startNewProject(data))} />
          </Sidebar>
          <Footer>Footer</Footer>
        </LayoutProjects>
      </ThemeProvider>
    </React.StrictMode>
  );
};
