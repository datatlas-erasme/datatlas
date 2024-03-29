import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LoadingProjectInterface, PublicUserInterface } from '@datatlas/models';
import MapPreview from './MapPreview';
import CardDetails from './CardDetails';

export interface ProjectCardProps {
  project: LoadingProjectInterface;
  user?: PublicUserInterface;
  onRemoveButtonClicked: (project: LoadingProjectInterface) => void;
}

const CardContainer = styled(Link)`
  display: flex;
  position: relative;
  width: ${(props) => props.theme.cardWidth};
  padding: ${(props) => props.theme.cardBoxContainer};
  text-decoration: none;
`;

const ProjectCard = ({ project, user, onRemoveButtonClicked }: ProjectCardProps) => {
  const handleRemoveButtonClicked = (e) => {
    onRemoveButtonClicked(project);
    e.preventDefault();
  };
  const handleCopy = (e) => {
    e.preventDefault();
  };

  return (
    <CardContainer to={`/projects/${project.id}`} key={project.id}>
      <CardDetails
        title={project.title}
        owner={project.owner}
        createdAt={project.createdAt}
        description={project.description}
        contributors={project.contributors}
      />
      <MapPreview project={project} user={user} handleRemove={handleRemoveButtonClicked} handleCopy={handleCopy} />
    </CardContainer>
  );
};
export default ProjectCard;
