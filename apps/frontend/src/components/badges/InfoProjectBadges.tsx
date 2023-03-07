import React from 'react';
import styled from 'styled-components';
import { EditorsIcon } from '../icon';
import { StyledBadgeOutline } from '../badges';

interface InfoProjectBadgesInterface {
  numbersContributors: number;
}

const BadgesContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`;

const InfoProjectBadges = ({ numbersContributors }: InfoProjectBadgesInterface) => {
  return (
    <BadgesContainer>
      <EditorsIcon width={10} />
      <StyledBadgeOutline>{numbersContributors}</StyledBadgeOutline>
    </BadgesContainer>
  );
};

export default InfoProjectBadges;
