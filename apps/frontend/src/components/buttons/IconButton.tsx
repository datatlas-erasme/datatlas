import React, { MouseEventHandler, ReactElement } from 'react';
import { MapControlButton } from 'kepler.gl/dist/components/common/styled-components';

interface IconButtonProps {
  Icon: ReactElement;
  onClick: MouseEventHandler;
}
export const IconButton = ({ Icon, onClick }: IconButtonProps) => {
  return <MapControlButton onClick={onClick}>{Icon}</MapControlButton>;
};
