import React, { ReactElement, ReactNode, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { Button as KeplerButton } from 'kepler.gl/dist/components/common/styled-components';

interface ButtonPropsInterface extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  Icon?: ReactElement;
  isInactive?: boolean;
  width?: string;
  large?: boolean;
  small?: boolean;
  primary?: boolean;
}

const StyledKeplerButton = styled(KeplerButton)``;
export const Button = ({ children, Icon, ...props }: ButtonPropsInterface) => {
  return (
    <StyledKeplerButton {...props}>
      {Icon}
      {children}
    </StyledKeplerButton>
  );
};

export default Button;
