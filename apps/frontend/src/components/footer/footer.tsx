import React from 'react';
import styled from 'styled-components';
import { DatatlasLogo, MetropoleLogo, ErasmeLogo, FranceRelanceLogo } from '../logos';
import GithubLink from '../buttons/GithubLink';

const FooterContainer = styled.footer`
  position: static;
  padding: 0 40px;
  height: 15vh;
  width: 100vw;
  font-size: ${(props) => props.theme.fontSizeXs};
  div {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    &:last-child {
      align-items: center;
      ul {
        display: flex;
        li {
          padding-left: 10px;
          &:first-child {
            padding-right: 10px;
            border-right: 1px solid;
          }
        }
      }
    }
  }
`;

const LogoContainer = styled.div`
  a {
    display: block;
    margin: auto 0;
    &:first-child {
      padding-left: 0;
      padding-right: 40px;
    }
    &:nth-child(1n + 2) {
      border-left: solid 1px;
      padding: 0 40px;
    }
  }
`;

const Footer = () => (
  <FooterContainer>
    <div>
      <LogoContainer>
        <a href={'/'} target={'_blank'} rel={'noreferrer'}>
          <DatatlasLogo />
        </a>
        <a href={'https://www.erasme.org/'} target={'_blank'} rel={'noreferrer'}>
          <ErasmeLogo />
        </a>
        <a href={'https://www.grandlyon.com/'} target={'_blank'} rel={'noreferrer'}>
          <MetropoleLogo />
        </a>
        <a href={'https://www.economie.gouv.fr/plan-de-relance'} target={'_blank'} rel={'noreferrer'}>
          <FranceRelanceLogo />
        </a>
      </LogoContainer>
      <GithubLink />
    </div>
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud.
      </p>
      <ul>
        <li>
          <a href={'/'}>© Datatlas</a>
        </li>
        <li>
          <a href={'/'}>Mentions Légales</a>
        </li>
      </ul>
    </div>
  </FooterContainer>
);

export default Footer;
