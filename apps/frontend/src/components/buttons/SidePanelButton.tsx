import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { IconButton } from './';
import { ArrowLeft } from '@kepler.gl/components/dist/common/icons';

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
    margin: 0 10px 0;
    background-color: ${({ theme }) => theme.floatingBtnBgd};
    &:active,
    &:hover {
      background-color: ${({ theme, displayAbout }) => (displayAbout ? theme.floatingBtnBgd : theme.greyMedium)};
    }
    svg {
      color: ${({ theme }) => theme.textColor};
      transform: ${({ displayAbout }) => (displayAbout ? 'rotate(0deg)' : 'rotate(180deg)')};
    }
  }
`;

const SidePanelButton = ({ onClick, displayAbout, children }: SidePanelButtonInterface) => {
  return (
    <SidePanelButtonStyle onClick={onClick} displayAbout={displayAbout}>
      <IconButton Icon={<ArrowLeft />} />
      {children}
    </SidePanelButtonStyle>
  );
};

export default SidePanelButton;
