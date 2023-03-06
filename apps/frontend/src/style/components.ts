import styled from 'styled-components';
import { Button } from 'kepler.gl/dist/components/common/styled-components';
import { themeColor, themeFontSize } from './theme';

// Custom Datatlas Component

export const StyledLabel = styled.label`
  display: flex;
  margin: 20px 0 10px 0;
  font-size: ${themeFontSize.sText};
  font-weight: 700;
`;

export const FormBtn = styled(Button).attrs({ as: 'input' })`
  margin: 20px auto;
  padding: 15px 40px;
  font-size: ${themeFontSize.mText};
  font-weight: 700;
  opacity: 1;
`;

export const BadgeOutlines = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border: 1.5px solid ${themeColor.primaryColor};
  border-radius: 50%;
  margin-left: 2px;
  font-size: ${({ theme }) => theme.fontSizeXs};
`;
