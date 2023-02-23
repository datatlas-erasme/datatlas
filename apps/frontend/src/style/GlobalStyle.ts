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
  h1, h2, h3, h4, h5, h6, p, a, button{
    font-family: 'Verdana', 'Helvetica Neue', 'Helvetica', 'sans-serif';
  }
  a, button{
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    border: none;
    background-color: transparent;
  }
`;
