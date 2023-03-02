import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import useTimeElapsed from '../../hooks/useTimeElapsed';
import InfoProjectBadges from '../badges/InfoProjectBadges';
import { UserInterface } from '@datatlas/models';

interface CardProjectDetailsInterface {
  owner: UserInterface;
  description: string;
  createdAt: Date;
  title: string;
  contributors: UserInterface[];
}
const ContentCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-flow: row wrap;
  padding: 10px;
  background-color: white;
  width: min-content;
  h3 {
    width: 100%;
  }
  h4 {
    margin: 10px 0;
  }
  h4,
  p {
    font-size: ${(props) => props.theme.fontSizeXs};
    font-weight: 400;
    line-height: 12px;
  }
  .status {
    color: ${(props) => props.theme.subtextColorCard};
  }
`;
const ActionsCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 10px 0;
`;

const CardProjectDetails = ({ owner, createdAt, title, contributors }: CardProjectDetailsInterface) => {
  return (
    <ContentCardContainer>
      <h4>{owner.name}</h4>
      <h3>{title}</h3>
      <p className={'status'}>
        <FormattedMessage defaultMessage={'Projet modifié'} /> {useTimeElapsed(createdAt)}
      </p>
      <ActionsCardContainer>
        <p>
          <FormattedMessage defaultMessage={'Contributeurs'} />
        </p>
        <InfoProjectBadges numbersContributors={contributors.length} />
      </ActionsCardContainer>
    </ContentCardContainer>
  );
};

export default CardProjectDetails;
