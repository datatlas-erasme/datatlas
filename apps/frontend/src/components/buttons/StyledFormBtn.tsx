import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import { Loader } from '../Loader';

export const StyledFormBtn = styled(({ loading, children, ...props }) => {
  return (
    <Button as="button" type="submit" Icon={loading ? <Loader /> : null} {...props} disabled={loading}>
      {children}
    </Button>
  );
})`
  background-color: black;
  margin: 20px auto;
  padding: 15px 42px;
  padding-left: ${({ loading }) => (loading ? '18px' : '42px')};
  font-size: ${({ theme }) => theme.mText};
  font-weight: 700;
  opacity: 1;
  transition-property: background-color;
  line-height: 20px;

  :disabled {
    background-color: #7a7a7a;
  }
`;
