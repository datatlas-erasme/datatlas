import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { DatatlasLogo, MetropoleLogo, ErasmeLogo, FranceRelanceLogo } from '../logos';
import GithubLink from '../buttons/GithubLink';

const FooterContainer = styled.footer`
  display: flex;
  flex-flow: row wrap;
  position: static;
  padding: 20px 40px;
  width: 100vw;
  p,
  li {
    font-size: ${({ theme }) => theme.fontSizeXs};
  }
  div {
    display: flex;
    justify-content: space-between;
    &:last-child {
      align-items: center;
      .text-licence {
        width: 65%;
      }
      ul {
        display: flex;
        li {
          width: max-content;
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
    display: flex;
    justify-content: space-around;
    margin: auto 0;
    svg {
      width: 100px;
    }
    &:first-child {
      padding-left: 0;
      padding-right: 20px;
    }
    &:nth-child(1n + 2) {
      border-left: solid 1px;
      padding: 0 20px;
    }
  }
`;

const Footer = () => (
  <FooterContainer>
    <div>
      <LogoContainer>
        <Link to={'/'} rel={'noreferrer'}>
          <DatatlasLogo />
        </Link>
        <Link to={'https://www.erasme.org/'} target={'_blank'} rel={'noreferrer'}>
          <ErasmeLogo />
        </Link>
        <Link to={'https://www.grandlyon.com/'} target={'_blank'} rel={'noreferrer'}>
          <MetropoleLogo />
        </Link>
        <Link to={'https://www.economie.gouv.fr/plan-de-relance'} target={'_blank'} rel={'noreferrer'}>
          <FranceRelanceLogo />
        </Link>
      </LogoContainer>
      <GithubLink bgColor={'current'} />
    </div>
    <div>
      <p className={'text-licence'}>
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
