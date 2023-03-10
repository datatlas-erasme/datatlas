import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

interface StatusProjectBadgesInterface {
  children: ReactNode;
  Icon?: ReactElement;
}

const BadgeOutlineStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.primaryBtnColor};
  border: 1px solid ${(props) => props.theme.primaryBtnBgd};
  padding: 5px 10px;
  font-size: ${(props) => props.theme.fontSizeXs};
  font-weight: 700;
  svg {
    padding-right: 5px;
  }
  p {
    margin-bottom: 0;
  }
`;
export const StatusProjectBadges = ({ children, Icon }: StatusProjectBadgesInterface) => {
  return (
    <BadgeOutlineStatus>
      {Icon}
      {children}
    </BadgeOutlineStatus>
  );
};
