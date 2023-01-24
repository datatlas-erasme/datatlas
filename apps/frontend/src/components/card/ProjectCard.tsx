import React from 'react';
import MapPreview from './MapPreview';
import CardDetails from './CardDetails';
import styled from 'styled-components';

// interface TestProjectsProps {
//   id: string;
//   published: boolean;
//   titleCard: string;
//   infoStatus: string;
//   desc: string;
//   adminInitial: string;
//   editorsNumber: number;
// }

const CardContainer = styled.article`
  display: flex;
  position: relative;
  width: ${(props) => props.theme.cardWidth};
  margin: auto;
`;
const ProjectCard = (props) => {
  const { published, titleCard, infoStatus, desc, adminInitial, editorsNumber } = props;
  return (
    <CardContainer>
      <MapPreview status={published} />
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
