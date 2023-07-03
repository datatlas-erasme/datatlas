import styled from 'styled-components';
import React, { ButtonHTMLAttributes } from 'react';

export const MenuIconButton = styled(({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <MenuIcon as="button" {...props} />
))`
  cursor: pointer;
  border-radius: 50%;
`;

export const MenuIcon = styled((props) => <div {...props} />)`
  align-self: center;
  justify-self: flex-end;
  padding: 3px;
`;
