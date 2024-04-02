import styled from 'styled-components';
import { Input } from '@kepler.gl/components';

export const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  ${Input} {
    flex-grow: 3;
  }
`;
