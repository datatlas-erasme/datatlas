import styled from 'styled-components';

export const HintText = styled.p`
  display: flex;
  font-size: ${({ theme }) => theme.hintTextFontSize};
  line-height: 1.3;
  color: ${({ theme }) => theme.hintTextColor};
  margin: 5px auto 10px;
`;
