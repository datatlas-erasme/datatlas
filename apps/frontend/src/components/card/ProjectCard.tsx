import React from 'react';
import MapPreview from './MapPreview';
import CardDetails from './CardDetails';
import styled from 'styled-components';
import { NormalizedProjectInterface } from '@datatlas/shared/models';
import { Link } from 'react-router-dom';

export type ProjectCardProps = NormalizedProjectInterface;

const CardContainer = styled.article`
  display: flex;
  position: relative;
  width: ${(props) => props.theme.cardWidth};
  padding: ${(props) => props.theme.cardBoxContainer};
`;
const ProjectCard = ({ id, name, draft }: ProjectCardProps) => {
  return (
    <CardContainer key={id}>
      <MapPreview draft={draft} />
      <CardDetails name={name} />
      <Link to={`/projects/${id}`}>Voir le projet</Link>
    </CardContainer>
  );
};

export default ProjectCard;
