import React from 'react';
import styled from 'styled-components';
import { EditorsIcon } from '../icon';
import { BadgeOutlines } from '../../style/theme';

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
      <BadgeOutlines>{numbersContributors}</BadgeOutlines>
    </BadgesContainer>
  );
};

export default InfoProjectBadges;
