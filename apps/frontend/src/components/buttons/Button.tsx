import React, { MouseEventHandler, ReactElement, ReactNode, ButtonHTMLAttributes } from 'react';
import { Button as KeplerButton } from 'kepler.gl/dist/components/common/styled-components';

interface ButtonInterface {
  children: ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>;
  Icon?: ReactElement;
  onClick?: MouseEventHandler;
}
export const Button = ({ children, Icon, onClick, type }: ButtonInterface) => {
  return (
    <KeplerButton onClick={onClick} type={type}>
      {Icon}
      {children}
    </KeplerButton>
  );
};
