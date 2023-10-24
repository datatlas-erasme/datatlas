import styled from 'styled-components';
import Button from './Button';

export const OutlineButton = styled(Button)`
  font-family: 'Roboto', Verdana, 'Helvetica Neue', Helvetica, sans-serif;
  font-size: ${({ large, small, theme }) => (large ? '16px' : small ? '12px' : '14px')};
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textColor};
  padding: ${({ large, small }) => (large ? '14px 24px' : small ? '3px 10px' : '4px 14px')};

  background-color: ${({ theme }) => theme.panelBackground};
  border: 2px solid ${({ theme }) => theme.textColor};
  border-radius: 20px;

  :hover {
    color: ${({ theme }) => theme.textColorHl};
    background-color: ${({ theme }) => theme.panelBackground};
    border: 2px solid ${({ theme }) => theme.textColorHl};
  }
`;
