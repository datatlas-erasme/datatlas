import React, { MouseEventHandler, ReactElement, ReactNode } from 'react';
import { Button } from 'kepler.gl/dist/components/common/styled-components';

interface IconButtonProps {
  children: ReactNode;
  Icon: ReactElement;
  onClick: MouseEventHandler;
}
export const IconTextButton = ({ children, Icon, onClick }: IconButtonProps) => {
  return (
    <Button onClick={onClick}>
      {Icon}
      {children}
    </Button>
  );
};
