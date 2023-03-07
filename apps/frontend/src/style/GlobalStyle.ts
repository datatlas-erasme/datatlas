import { createGlobalStyle } from 'styled-components';
import { themeFontSize, boxSizing, fontFamily } from './theme';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: ${boxSizing};
    margin: 0;
    padding: 0;
    font-family: ${fontFamily};
  }

  html{
    scroll-behavior: smooth;
  }

  h2{
    font-size: ${themeFontSize.lText};
    font-weight: 400;
  }
  h3{
    font-size: ${themeFontSize.smText};
    font-weight: 600;
    line-height: 17px;
  }
  p{
    font-size: ${themeFontSize.sText};
  }
  li{
    list-style: none;
    font-size: ${themeFontSize.smText};
    line-height: 25px;
  }
  a, button{
    cursor: pointer;
    color: inherit;
    border: none;
    background-color: transparent;
  }

  .side-panel--container{
    padding: 0;
  }
`;
