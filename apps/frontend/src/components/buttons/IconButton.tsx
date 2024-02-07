import React, { MouseEventHandler, ReactElement } from 'react';
import { MapControlButton } from '@kepler.gl/components';
import styled from 'styled-components';

interface IconButtonInterface {
  Icon: ReactElement;
  onClick?: MouseEventHandler;
}

const ActionButton = styled(MapControlButton)`
  color: ${({ theme }) => theme.primaryBtnColor};
  background-color: ${({ theme }) => theme.primaryBtnBgd};
  margin: 0 5px;
`;
export const IconButton = ({ Icon, onClick }: IconButtonInterface) => {
  return <ActionButton onClick={onClick}>{Icon}</ActionButton>;
};
