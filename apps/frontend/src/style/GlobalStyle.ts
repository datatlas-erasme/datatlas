import { createGlobalStyle } from 'styled-components';
import { ChickletButton } from 'kepler.gl/dist/components/common/item-selector/chickleted-input';
import { DatatlasTheme } from './theme';
export const GlobalStyle = createGlobalStyle<DatatlasTheme>`
  * {
    box-sizing: ${({ theme }) => theme.boxSizing};
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.fontFamily};
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    overflow-x: hidden;
  }

  html, body, #root {
    height: 100%;
    margin: 0;
  }

  h2{
    font-size: ${({ theme }) => theme.smText};
    font-weight: 600;
  }
  h3{
    font-size: ${({ theme }) => theme.smText};
    font-weight: 400;
    line-height: 17px;
  }
  p{
    font-size: ${({ theme }) => theme.sText};
  }
  li{
    list-style: none;
    font-size: ${({ theme }) => theme.smText};
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

  ${ChickletButton} {
    border: solid 1px ${({ theme }) => theme.primaryColor}
}

  .side-side-panel__header__bottom{
    padding: 0;
    border-bottom: ${({ theme }) => theme.panelBorderLT};
  }

  .attrition-logo a.mapboxgl-ctrl-logo {
    display: none;
  }

`;
