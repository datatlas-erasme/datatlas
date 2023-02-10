import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: content-box;
    margin: 0;
    padding: 0;
    font-family: 'Verdana', 'Helvetica Neue', 'Helvetica', 'sans-serif';
  }
  li{
    list-style: none;
  }
  a, button{
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    border: none;
    background-color: transparent;
  }
`;
