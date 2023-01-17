import React from 'react';
import ProjectCard from '../components/card/ProjectCard';
import { ThemeProvider } from 'styled-components';
import { datatlasTheme } from '../style/customTheme';

export const ProjectsPage = () => (
  <ThemeProvider theme={datatlasTheme}>
    <h1>Projects</h1>
    <ProjectCard />
  </ThemeProvider>
);
