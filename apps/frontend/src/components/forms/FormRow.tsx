import styled from 'styled-components';
import { Input } from 'kepler.gl/dist/components/common/styled-components';

export const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  ${Input} {
    flex-grow: 3;
  }
`;
