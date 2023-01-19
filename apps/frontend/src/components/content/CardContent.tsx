import React from 'react';
import styled from 'styled-components';

const StatusModif = styled.p`
  color: #cecece;
  margin: 0;
`;
const CardContent = ({ titleCard, infoStatus, desc }) => {
  return (
    <>
      <h3>{titleCard}</h3>
      <StatusModif>{infoStatus}</StatusModif>
      <StatusModif>{desc}</StatusModif>
    </>
  );
};

export default CardContent;
