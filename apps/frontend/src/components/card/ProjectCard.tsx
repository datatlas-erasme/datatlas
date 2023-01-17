import React from 'react';
import MapPreview from './MapPreview';
import CardContent from '../content/CardContent';
import styled from 'styled-components';

const CardContainer = styled.article`
  display: flex;
  position: relative;
  width: 50vw;
  margin: auto;
`;
const ProjectCard = () => (
  <CardContainer>
    <MapPreview />
    <CardContent />
  </CardContainer>
);

export default ProjectCard;
