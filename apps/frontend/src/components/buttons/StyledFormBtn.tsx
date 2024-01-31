import React from 'react';
import styled from 'styled-components';
import { Button, ButtonPropsInterface } from './Button';
import { Loader } from '../Loader';

export interface StyledFormBtnProps extends ButtonPropsInterface {
  loading: boolean;
}

export const StyledFormBtn = styled(({ loading, children, ...props }: StyledFormBtnProps) => {
  return (
    <Button type="submit" Icon={loading ? <Loader /> : undefined} {...props} disabled={loading}>
      {children}
    </Button>
  );
})`
  opacity: 1;
  transition-property: background-color;

  :disabled {
    background-color: #7a7a7a;
  }
`;
