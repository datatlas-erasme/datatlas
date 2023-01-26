import React from 'react';
import styled from 'styled-components';

const CardStatusInfos = styled.p`
  color: #cecece;
  margin: 0;
`;
const CardContent = ({ titleCard }) => {
  return (
    <>
      <h3>{titleCard}</h3>
      <CardStatusInfos>infoStatus</CardStatusInfos>
      <CardStatusInfos>desc</CardStatusInfos>
    </>
  );
};

export default CardContent;
