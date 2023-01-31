import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: content-box;
    margin: 0;
    padding: 0;
  }
  li{
    list-style: none;
  }
  a, button{
    cursor: pointer;
  }
`;
