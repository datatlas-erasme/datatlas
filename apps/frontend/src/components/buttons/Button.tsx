import React, { MouseEventHandler, ReactElement, ReactNode, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { Button as KeplerButton } from 'kepler.gl/dist/components/common/styled-components';

type ButtonPropsInterface = {
  children: ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>;
  Icon?: ReactElement;
  onClick?: MouseEventHandler;
  className?: string;
  isInactive?: boolean;
  width: string;
};

const StyledKeplerButton = styled(KeplerButton)`
  margin: 10px;
  width: auto;
`;
export const Button = ({ children, Icon, onClick, type, className }: ButtonPropsInterface) => {

  return (
    <StyledKeplerButton onClick={onClick} type={type} className={className}>
      {Icon}
      {children}
    </StyledKeplerButton>
  );
};
