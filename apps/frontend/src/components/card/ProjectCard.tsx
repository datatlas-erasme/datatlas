import React from 'react';
import MapPreview from './MapPreview';
import CardDetails from './CardDetails';
import styled from 'styled-components';
import { DatasetInterface, NormalizedProjectInterface } from '@datatlas/shared/models';

// interface CardProps {
//   draft: boolean;
//   titleCard: string;
//   infoStatus?: string;
//   desc: string;
//   adminInitial: string;
//   editorsNumber: number;
//   projects: DatasetInterface[];
// }
export type ProjectListItemProps = NormalizedProjectInterface;

const CardContainer = styled.article`
  display: flex;
  position: relative;
  width: ${(props) => props.theme.cardWidth};
  padding: ${(props) => props.theme.cardBoxContainer};
`;
const ProjectCard = ({ id, name, draft }: ProjectListItemProps) => {
  return (
    <CardContainer key={id}>
      <MapPreview published={draft} />
      <CardDetails name={name} />
    </CardContainer>
  );
};

export default ProjectCard;
