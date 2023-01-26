import React from 'react';
import styled from 'styled-components';

interface CardContentInterface {
  titleCard: string;
}

const CardStatusInfos = styled.p`
  color: #cecece;
  margin: 0;
`;
const CardContent = ({ titleCard }: CardContentInterface) => {
  return (
    <>
      <h3>{titleCard}</h3>
      <CardStatusInfos>infoStatus</CardStatusInfos>
      <CardStatusInfos>desc</CardStatusInfos>
    </>
  );
};

export default CardContent;
