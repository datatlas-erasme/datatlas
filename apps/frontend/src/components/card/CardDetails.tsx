import React from 'react';
import styled from 'styled-components';
import InfoProjectBadges from '../badges/InfoProjectBadges';
import CardContent from '../content/CardContent';

interface CardContentProps {
  titleCard: string;
  infoStatus?: string;
  desc: string;
  adminInitial: string;
  editorsNumber: number;
}

const ContentCardContainer = styled.div`
  padding: 10px;
  background-color: white;

  h3 {
    margin: 0;
  }
`;
const ActionsCardContainer = styled.div`
  display: flex;
  list-style: none;
  justify-content: space-around;
  margin: 10px 0;
`;

const CardDetails = ({ titleCard, infoStatus, desc, adminInitial, editorsNumber }: CardContentProps) => {
  return (
    <ContentCardContainer>
      <CardContent desc={desc} titleCard={titleCard} infoStatus={infoStatus} />
      <ActionsCardContainer>
        <InfoProjectBadges adminInitial={adminInitial} editorsNumber={editorsNumber} />
      </ActionsCardContainer>
    </ContentCardContainer>
  );
};

export default CardDetails;
