import React from 'react';
import MapPreview from './MapPreview';
import CardDetails from './CardDetails';
import styled from 'styled-components';
import { ProjectInterface } from '@datatlas/shared/models';
import { Link } from 'react-router-dom';

export type ProjectCardProps = ProjectInterface;

const CardContainer = styled.article`
  display: flex;
  position: relative;
  width: ${(props) => props.theme.cardWidth};
  padding: ${(props) => props.theme.cardBoxContainer};
`;
const ProjectCard = ({ id, title, draft }: ProjectCardProps) => {
  return (
    <CardContainer key={id}>
      <MapPreview draft={draft} />
      <CardDetails title={title} />
      <Link to={`/projects/${id}`}>Voir le projet</Link>
    </CardContainer>
  );
};

export default ProjectCard;
