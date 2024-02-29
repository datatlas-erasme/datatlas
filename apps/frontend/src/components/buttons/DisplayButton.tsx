import React, { MouseEventHandler, ReactElement, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { ArrowDown, ArrowRight } from '@kepler.gl/components/dist/common/icons';

interface DisplayButtonInterface {
  children: ReactNode;
  Icon?: ReactElement;
  onClick?: MouseEventHandler;
}

const DisplayButtonStyle = styled.button`
  display: flex;
  align-items: center;
`;
export const DisplayButton = ({ children }: DisplayButtonInterface) => {
  const [expand, setExpand] = useState(true);
  function toggleExpand() {
    setExpand(!expand);
  }
  return (
    <DisplayButtonStyle onClick={toggleExpand}>
      {children}
      {expand ? <ArrowRight /> : <ArrowDown />}
    </DisplayButtonStyle>
  );
};
