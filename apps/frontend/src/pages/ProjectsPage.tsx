import React from 'react';
import ProjectCard from '../components/card/ProjectCard';
import { ThemeProvider } from 'styled-components';
import { datatlasTheme } from '../style/customTheme';

const testProjectsProps = {
  id: 'p012',
  published: true,
  titleCard: 'Titre de projet',
  infoStatus: 'Modidifié le 6 janvier 2033',
  desc: 'Sed ornare, diam eu dictum pulvinar, elit nisi varius felis, vel accumsan felis erat vel mauris. Nulla consectetur tellus vulputate neque pharetra, sit amet consectetur diam auctor. Praesent imperdiet nisl et vulputate maximus. Etiam viverra consectetur leo, a vehicula odio ornare sed.',
  adminInitial: 'AA',
  editorsNumber: 3,
};

export const ProjectsPage = () => (
  <ThemeProvider theme={datatlasTheme}>
    <h1>Projects</h1>
    <ProjectCard {...testProjectsProps} />
  </ThemeProvider>
);
