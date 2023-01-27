import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  li{
    list-style: none;
  }
  a{
    cursor: pointer;
  }
`;
