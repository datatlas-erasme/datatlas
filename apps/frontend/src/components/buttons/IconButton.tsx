import React, { MouseEventHandler, ReactElement } from 'react';
import { MapControlButton } from 'kepler.gl/dist/components/common/styled-components';

interface IconButtonInterface {
  Icon: ReactElement;
  onClick: MouseEventHandler;
}
export const IconButton = ({ Icon, onClick }: IconButtonInterface) => {
  return <MapControlButton onClick={onClick}>{Icon}</MapControlButton>;
};
