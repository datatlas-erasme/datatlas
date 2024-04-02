import React, { ReactElement, ReactNode, ButtonHTMLAttributes } from 'react';
import { Button as KeplerButton } from '@kepler.gl/components';

export interface ButtonPropsInterface extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  Icon?: ReactElement;
  isInactive?: boolean;
  width?: string;
  large?: boolean;
  small?: boolean;
  primary?: boolean;
}

export const Button = ({ children, Icon, ...props }: ButtonPropsInterface) => {
  return (
    <KeplerButton as="button" {...props}>
      {Icon}
      {children}
    </KeplerButton>
  );
};

export default Button;
