import { createGlobalStyle } from 'styled-components';
import { themeFontSize } from './theme';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Verdana', 'Helvetica Neue', 'Helvetica', 'sans-serif';
  }
  h2{
    font-size: ${themeFontSize.lText};
    font-weight: 400;
  }
  p{
    font-size: ${themeFontSize.sText};
  }
  li{
    list-style: none;
    line-height: 25px;
  }
  a, button{
    cursor: pointer;
    color: inherit;
    border: none;
    background-color: transparent;
  }
`;
