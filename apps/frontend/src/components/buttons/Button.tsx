import React, { MouseEventHandler, ReactElement, ReactNode } from 'react';
import { Button as KeplerButton } from 'kepler.gl/dist/components/common/styled-components';

interface ButtonInterface {
  children: ReactNode;
  Icon: ReactElement;
  onClick: MouseEventHandler;
}
export const Button = ({ children, Icon, onClick }: ButtonInterface) => {
  return (
    <KeplerButton onClick={onClick}>
      {Icon}
      {children}
    </KeplerButton>
  );
};
