import React from 'react';
import styled from 'styled-components';
import { DatatlasLogo, MetropoleLogo, ErasmeLogo, FranceRelanceLogo, GithubLogo } from '../logos';

const FooterContainer = styled.footer`
  grid-area: footer;
  padding: ${(props) => props.theme.layoutsBoxContainer};
  height: 10vh;
  div {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    .githublink {
      align-items: center;
      p {
        padding-right: 20px;
      }
    }
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
        <a href={'#'} target={'_blank'} rel={'noreferrer'}>
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
      <div className={'githublink'}>
        <p>Lien vers le Github du projet :</p>
        <a href={'#'} target={'_blank'} rel={'noreferrer'}>
          <GithubLogo />
        </a>
      </div>
    </div>
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud.
      </p>
      <ul>
        <li>
          <a href={'#'}>© Datatlas</a>
        </li>
        <li>
          <a href={'#'}>Mentions Légales</a>
        </li>
      </ul>
    </div>
  </FooterContainer>
);

export default Footer;
