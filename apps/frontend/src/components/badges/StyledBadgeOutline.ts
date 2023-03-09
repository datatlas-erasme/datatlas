import styled from 'styled-components';

export const StyledBadgeOutline = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border: 1.5px solid ${({ theme }) => theme.primaryColor};
  border-radius: 50%;
  margin-left: 2px;
  font-size: ${({ theme }) => theme.xsText};
`;
