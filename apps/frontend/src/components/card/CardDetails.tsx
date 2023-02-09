import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import InfoProjectBadges from '../badges/InfoProjectBadges';
import { UserInterface } from '@datatlas/models';

interface CardProjectDetailsInterface {
  owner: UserInterface;
  description: string;
  createdAt: Date;
  title: string;
}
const ContentCardContainer = styled.div`
  padding: 10px;
  background-color: white;
  width: 40%;

  h3 {
    font-size: 14px;
    font-weight: 600;
    line-height: 17px;
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

const CardProjectDetails = ({ owner, createdAt, title }: CardProjectDetailsInterface) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const timeStatus = new Date(createdAt).getTime();

  const modifiedTime = (timeStatus) => {
    const time = Date.now() - timeStatus;
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => modifiedTime(timeStatus), 1000);
    return () => clearInterval(interval);
  }, [timeStatus]);

  return (
    <ContentCardContainer>
      <h4>{'owner'}</h4>
      <h3>{title}</h3>

      <p className={'status'}>
        <FormattedMessage defaultMessage={'Modifié il y a'} /> {days === 0 ? '' : days + 'j'}{' '}
        {hours === 0 ? '' : hours + 'h'}
        {hours > 0 ? '' : minutes + 'min'}
      </p>
      <ActionsCardContainer>
        <p>
          <FormattedMessage defaultMessage={'Contributeurs'} />
        </p>
        <InfoProjectBadges editorsNumber={1} />
      </ActionsCardContainer>
    </ContentCardContainer>
  );
};

export default CardProjectDetails;
