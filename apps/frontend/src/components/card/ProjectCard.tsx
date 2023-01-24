import React from 'react';
import MapPreview from './MapPreview';
import CardDetails from './CardDetails';
import styled from 'styled-components';

interface CardProps {
  draft: boolean;
  titleCard: string;
  infoStatus?: string;
  desc: string;
  adminInitial: string;
  editorsNumber: number;
}

const CardContainer = styled.article`
  display: flex;
  position: relative;
  width: ${(props) => props.theme.cardWidth};
  padding: ${(props) => props.theme.cardBoxContainer};
`;
const ProjectCard = ({ draft, titleCard, infoStatus, desc, adminInitial, editorsNumber }: CardProps) => {
  return (
    <CardContainer>
      <MapPreview draft={draft} />
      <CardDetails
        titleCard={titleCard}
        infoStatus={infoStatus}
        desc={desc}
        adminInitial={adminInitial}
        editorsNumber={editorsNumber}
      />
    </CardContainer>
  );
};

export default ProjectCard;
