import React from 'react';
import styled from 'styled-components';
import { EditorsIcon } from '../icon';
import { BadgeOutlines } from '../../style/theme';

interface InfoProjectBadgesInterface {
  contributors: number;
}

const BadgesContainer = styled.a`
  display: flex;
  align-items: center;
  margin: 10px;
`;

const InfoProjectBadges = ({ contributors }: InfoProjectBadgesInterface) => {
  return (
    <BadgesContainer>
      <EditorsIcon width={10} />
      <BadgeOutlines>{contributors}</BadgeOutlines>
    </BadgesContainer>
  );
};

export default InfoProjectBadges;
