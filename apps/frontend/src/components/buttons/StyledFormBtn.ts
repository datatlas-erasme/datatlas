import styled from 'styled-components';
import { Button } from 'kepler.gl/dist/components/common/styled-components';

export const StyledFormBtn = styled(Button).attrs({ as: 'input' })`
  margin: 20px auto;
  padding: 15px 40px;
  font-size: ${({ theme }) => theme.mText};
  font-weight: 700;
  opacity: 1;
`;
