import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { DatatlasLogo, MetropoleLogo, ErasmeLogo, FranceRelanceLogo } from '../logos';
import { GithubLink } from '../buttons';

const FooterContainer = styled.footer`
  display: flex;
  flex-flow: row wrap;
  flex-direction: column;
  padding: 20px 40px 8px 40px;
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
        align-items: center;
        li {
          width: max-content;
          padding-left: 10px;
          &:first-child {
            padding-right: 10px;
            border-right: 1px solid;
          }
          &:last-child {
            padding-right: 0;
            border-right: 0;
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
        <Link to={'/login'} rel={'noreferrer'}>
          <DatatlasLogo />
        </Link>
        <a href={'https://www.erasme.org/'} target={'_blank'} rel={'noreferrer'}>
          <ErasmeLogo />
        </a>
        <a href={'https://www.grandlyon.com/'} target={'_blank'} rel={'noreferrer'}>
          <MetropoleLogo />
        </a>
        <a
          href={
            'https://agence-cohesion-territoires.gouv.fr/france-relance-un-plan-de-cohesion-economique-sociale-et-territoriale-216'
          }
          target={'_blank'}
          rel={'noreferrer'}
        >
          <FranceRelanceLogo />
        </a>
      </LogoContainer>
      <ul>
        <li>
          <GithubLink bgColor={'current'} />
        </li>
      </ul>
    </div>
    <div>
      <p className={'text-licence'}>
        Un projet mené par Erasme, laboratoire d'innovation de la Métropole de Lyon, avec le soutien de France Relance
      </p>
      <ul>
        <li>
          <Link to={'/legalmentions'} rel={'noreferrer'}>
            Mentions Légales
          </Link>
        </li>
      </ul>
    </div>
  </FooterContainer>
);

export default Footer;
