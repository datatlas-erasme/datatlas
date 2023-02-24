import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { IconButton } from './';
import { ArrowRight } from 'kepler.gl/dist/components/common/icons';
import { StyledLabel } from '../../style/theme';

interface SidePanelButtonInterface {
  children: ReactNode;
  onClick: (e) => void;
  displayAbout: boolean;
}
interface AboutSidePanelButtonInterface {
  displayAbout: boolean;
}

const SidePanelButtonStyle = styled.a<AboutSidePanelButtonInterface>`
  display: flex;
  align-items: center;
  position: absolute;
  right: -100px;
  top: 50px;
  z-index: 1;
  div {
    margin: 0;
    background-color: ${({ theme }) => theme.linkBtnBgd};
    &:active,
    &:hover {
      background-color: ${({ theme, displayAbout }) => (displayAbout ? theme.linkBtnBgd : theme.linkBtnActBgdHover)};
    }
    svg {
      color: ${({ theme }) => theme.textColor};
      transform: ${({ displayAbout }) => (displayAbout ? 'rotate(0deg)' : 'rotate(180deg)')};
    }
  }
  ${StyledLabel} {
    margin-left: 10px;
  }
`;

const SidePanelButton = ({ onClick, displayAbout, children }: SidePanelButtonInterface) => {
  return (
    <SidePanelButtonStyle onClick={onClick} displayAbout={displayAbout}>
      <IconButton Icon={<ArrowRight />} />
      {children}
    </SidePanelButtonStyle>
  );
};

export default SidePanelButton;
