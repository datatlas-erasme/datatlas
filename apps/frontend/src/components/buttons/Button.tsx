import React, { MouseEventHandler, ReactElement, ReactNode, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { Button as KeplerButton } from 'kepler.gl/dist/components/common/styled-components';

interface ButtonInterface {
  children: ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>;
  Icon?: ReactElement;
  onClick?: MouseEventHandler;
}

const StyledKeplerButton = styled(KeplerButton)`
  margin: 10px;
`;
const Button = ({ children, Icon, onClick, type }: ButtonInterface) => {
  return (
    <StyledKeplerButton onClick={onClick} type={type}>
      {Icon}
      {children}
    </StyledKeplerButton>
  );
};

export default Button;
