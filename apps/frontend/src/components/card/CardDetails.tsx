import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InfoProjectBadges from '../badges/InfoProjectBadges';

interface CardProjectDetailsInterface {
  name: string;
  nameOwner: string;
  description: string;
  updatedAt: Date;
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
    margin: 14px 0;
    font-size: ${(props) => props.theme.fontSizeXs};
    font-weight: 600;
  }
  p {
    font-size: ${(props) => props.theme.fontSizeXs};
    line-height: 12px;
    color: #cecece;
  }
`;
const ActionsCardContainer = styled.div`
  display: flex;
  list-style: none;
  justify-content: space-around;
  margin: 10px 0;
`;

const CardProjectDetails = ({ name, nameOwner, updatedAt }: CardProjectDetailsInterface) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const timeStatus = updatedAt.getTime();

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
      <h4>{nameOwner}</h4>
      <h3>{name}</h3>
      <p>
        Modifié il y a {days}j-{hours}h-{minutes}min
      </p>
      <ActionsCardContainer>
        <p>Contributeurs</p>
        <InfoProjectBadges editorsNumber={1} />
      </ActionsCardContainer>
    </ContentCardContainer>
  );
};

export default CardProjectDetails;
