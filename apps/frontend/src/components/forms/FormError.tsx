import styled from 'styled-components';

export const FormError = styled.div`
  display: flex;
  margin: 4px 0 10px 0;
  font-size: ${({ theme }) => theme.sText};
  font-weight: 500;
  color: #ff3c3c;
`;
