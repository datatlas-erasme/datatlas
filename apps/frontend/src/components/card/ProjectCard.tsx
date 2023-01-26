import React from 'react';
import MapPreview from './MapPreview';
import CardDetails from './CardDetails';
import styled from 'styled-components';
import { DatasetInterface, NormalizedProjectInterface } from '@datatlas/shared/models';

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
      <MapPreview published={draft} />
      <CardDetails name={name} />
    </CardContainer>
  );
};

export default ProjectCard;
