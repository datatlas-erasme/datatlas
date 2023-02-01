import React from 'react';
import styled from 'styled-components';
import InfoProjectBadges from '../badges/InfoProjectBadges';
import CardContent from '../content/CardContent';

interface CardProjectDetailsInterface {
  title: string;
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

const CardProjectDetails = ({ title }: CardProjectDetailsInterface) => {
  return (
    <ContentCardContainer>
      <CardContent titleCard={title} />
      <ActionsCardContainer>
        <InfoProjectBadges editorsNumber={1} adminInitial={'AG'} />
      </ActionsCardContainer>
    </ContentCardContainer>
  );
};

export default CardProjectDetails;
