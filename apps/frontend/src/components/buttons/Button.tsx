import React, { MouseEventHandler, ReactElement, ReactNode, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { Button as StyleKeplerButton } from 'kepler.gl/dist/components/common/styled-components';

interface ButtonInterface {
  children: ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>;
  Icon?: ReactElement;
  onClick?: MouseEventHandler;
}

const StyleStyleKeplerButton = styled(StyleKeplerButton)`
  margin: 10px;
`;
export const Button = ({ children, Icon, onClick, type }: ButtonInterface) => {
  return (
    <StyleStyleKeplerButton onClick={onClick} type={type}>
      {Icon}
      {children}
    </StyleStyleKeplerButton>
  );
};
