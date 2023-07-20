import styled from 'styled-components';
import React, { ButtonHTMLAttributes } from 'react';

export const MenuIconButton = styled(({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <MenuIcon as="button" {...props} />
))`
  cursor: pointer;
  border-radius: 50%;
`;

export const MenuIcon = styled((props) => <div {...props} />)`
  font-family: 'Roboto', Verdana, 'Helvetica Neue', Helvetica, sans-serif;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;
