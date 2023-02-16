import React, { useState } from 'react';
import styled from 'styled-components';
import { Layout } from './layouts';
import { LoginForm } from '../components/forms/LoginForm';
import { DatatlasLogoSquare } from '../components/logos';
import FirstShapeBg from '../assets/shapes/first-shape.svg';
import SecondShapeBg from '../assets/shapes/second-shape.svg';
import { LabelStyle } from '../style/theme';
import { FormattedMessage } from 'react-intl';
import GithubLink from '../components/buttons/GithubLink';
import SidePanelButton from '../components/buttons/SidePanelButton';

interface AboutWrapperInterface {
  displayAbout: boolean;
}

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 50vw;
  min-height: 85vh;
  background-image: url(${FirstShapeBg});
  background-repeat: no-repeat;
  background-position: left top;
  background-size: 99%;
  padding: 60px 0 40px 40px;
  .brand-area {
    position: relative;
    width: 400px;
    top: -5px;
    left: 140px;
  }
  p {
    margin-top: auto;
    white-space: pre-wrap;
  }
`;
const AboutWrapper = styled.div<AboutWrapperInterface>`
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: center;
  padding: 0 60px;
  width: 50vw;
  min-height: 85vh;
  background-color: ${({ theme }) => theme.mapPanelBackgroundColor};
  box-shadow: 0 6px 12px 0 rgb(0 0 0 / 16%);
  transform: ${({ displayAbout }) => (displayAbout ? 'translateX(-100%)' : 'translateX(0)')};
  transition: transform 0.8s ease-in-out;

  p,
  ul,
  h2,
  h3 {
    color: ${({ theme }) => theme.panelBackgroundLT};
  }

  ul {
    height: 75px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 20px 0;
  }
`;
const LoginFormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  width: 50vw;
  min-height: 85vh;
  background-image: url(${SecondShapeBg});
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: 300px;
  padding: ${(props) => props.theme.layoutsBoxContainer};
`;

export const LoginPage = () => {
  const [displayAbout, setDisplayAbout] = useState(false);
  const handleDisplayAbout = (e) => {
    e.preventDefault();
    setDisplayAbout(!displayAbout);
  };

  return (
    <Layout>
      <LogoWrapper>
        <div className={'brand-area'}>
          <DatatlasLogoSquare />
          <h4>L’outil de création de cartographies web interactives qui valorise vos données</h4>
        </div>
        <p>
          Vous souhaitez rejoindre l'expérimentation et tester l'outil ?{' '}
          <a href={'mailto:administrateur@metropole.fr'}>Contacter l'administrateur</a>
        </p>
      </LogoWrapper>
      <AboutWrapper displayAbout={displayAbout}>
        <SidePanelButton onClick={handleDisplayAbout} displayAbout={displayAbout}>
          <LabelStyle htmlFor={'About'}>
            <FormattedMessage defaultMessage="À propos" />
          </LabelStyle>
        </SidePanelButton>
        <h2>À propos</h2>
        <p>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
          atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
          sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
        </p>
        <p>
          Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi
          optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est,
          omnis dolor repellendus.
        </p>
        <p>
          Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates
          repudiandae sint et molestiae non recusandae.
        </p>
        <h3>Contributeurs :</h3>
        <ul>
          <li>Prénom Nom</li>
          <li>Prénom Nom</li>
          <li>Prénom Nom</li>
          <li>Prénom Nom</li>
          <li>Prénom Nom</li>
          <li>Prénom Nom</li>
        </ul>
        <GithubLink />
      </AboutWrapper>
      <LoginFormWrapper>
        <LoginForm />
      </LoginFormWrapper>
    </Layout>
  );
};
