import React from 'react';
import { Hash } from 'kepler.gl/dist/components/common/icons';
import styled from 'styled-components';

interface InfoProjectBadgesInterface {
  numbersContributors: number;
}

const BadgesContainer = styled.a`
  display: flex;
  align-items: center;
  margin: 10px;
`;
const BadgeOutlines = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border: 1.5px solid #000000;
  border-radius: 50%;
  margin-left: 2px;
  font-family: ${(props) => props.theme.fontSizeXs};
`;

const InfoProjectBadges = ({ numbersContributors }: InfoProjectBadgesInterface) => {
  return (
    <BadgesContainer>
      <Hash width={10} />
      <BadgeOutlines>
        <p>{numbersContributors}</p>
      </BadgeOutlines>
    </BadgesContainer>
  );
};

export default InfoProjectBadges;
