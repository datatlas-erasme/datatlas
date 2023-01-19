import React from 'react';
import { Hash } from 'kepler.gl/dist/components/common/icons';
import styled from 'styled-components';

const BadgeContainer = styled.a`
  display: flex;
  align-items: center;
  margin: 10px;
`;

const BadgeOutlines = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border: 1.5px solid #000000;
  border-radius: 50%;
  margin-left: 10px;
`;

const adminInitial = 'AG';
const editorNumber = 4;
const InfoProjectButton = () => {
  return (
    <>
      <BadgeContainer>
        <Hash />
        <BadgeOutlines>{adminInitial}</BadgeOutlines>
      </BadgeContainer>
      <BadgeContainer>
        <Hash />
        <BadgeOutlines>{editorNumber}</BadgeOutlines>
      </BadgeContainer>
    </>
  );
};

export default InfoProjectButton;
