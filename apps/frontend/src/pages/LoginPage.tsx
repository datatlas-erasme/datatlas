import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from '../components/i18n/FormattedMessage';
import { Layout } from './layouts';
import { LoginForm } from '../components/forms';
import { DatatlasLogoSquare } from '../components/logos';
import FirstShapeBg from '../assets/shapes/first-shape.svg';
import SecondShapeBg from '../assets/shapes/second-shape.svg';
import { StyledLabel } from '../components/forms';
import GithubLink from '../components/buttons/GithubLink';
import SidePanelButton from '../components/buttons/SidePanelButton';

interface AboutWrapperInterface {
  displayAbout: boolean;
}

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50vw;
  min-height: 85vh;
  background-image: url(${FirstShapeBg});
  background-repeat: no-repeat;
  background-position: left top;
  background-size: cover;
  .brand-area {
    text-align: center;
    width: 400px;
    margin: auto;
    svg {
      width: 350px;
    }
  }
  p {
    margin: auto 0 20px 30px;
    white-space: pre-wrap;
  }
`;
const AboutWrapper = styled.div<AboutWrapperInterface>`
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: center;
  padding: 0 60px;
  min-height: 85vh;
  width: 50vw;
  background-color: ${({ theme }) => theme.mapPanelBackgroundColor};
  box-shadow: 0 6px 12px 0 rgb(0 0 0 / 16%);
  transform: ${({ displayAbout }) => (displayAbout ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.8s ease-in-out;
  p,
  h2,
  ul,
  h3 {
    color: ${({ theme }) => theme.panelBackgroundLT};
    margin: 10px 0;
  }

  ul {
    display: flex;
    flex-direction: column;
    margin: 0 0 10px;
    li {
      font-size: ${({ theme }) => theme.fontSize};
    }
  }
`;
const LoginFormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  min-height: 85vh;
  max-width: 100vw;
  background-image: url(${SecondShapeBg});
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: 300px;
  padding: ${(props) => props.theme.layoutsBoxContainer};
`;

export const LoginPage = () => {
  const [displayAbout, setDisplayAbout] = useState(false);
  const bgColorRef = useRef<HTMLDivElement>(null);

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
          Vous souhaitez rejoindre l'expérimentation et tester l'outil ?
          <a href={'mailto:aangelot@grandlyon.com'}>Contacter l'administrateur</a>
        </p>
      </LogoWrapper>
      <AboutWrapper displayAbout={displayAbout} ref={bgColorRef}>
        <SidePanelButton onClick={handleDisplayAbout} displayAbout={displayAbout}>
          <StyledLabel htmlFor={'About'}>
            <FormattedMessage id={'about.title'}  defaultMessage={'A propos'}/>
          </StyledLabel>
        </SidePanelButton>
        <h2>
          A propos
        </h2>
        <p>
          Datatlas est un outil de cartographie interactif. Il permet de créer à la volée des représentations
          cartographiques croisant plusieurs jeux de données et simplifiant l’animation de la relation usager par le
          crowdsourcing et les modes de visualisation avancées. Cet outil à destination de porteurs de projets facilite
          l’accès aux données géographiques pour le grand public. Le projet est open source, nous serions heureux
          d’échanger avec vous sur vos besoins.
        </p>
        <h3>Contributeurs :</h3>
        <ul>
          <li>Anthony Angelot (Erasme - Métropole de Lyon)</li>
          <li>Patrick Vincent (Erasme - Métropole de Lyon)</li>
          <li>Pierre-Alexandre Racine (Erasme - Métropole de Lyon)</li>
          <li>Yassin Siouda (Erasme - Métropole de Lyon)</li>
          <li>Olivier Pierre (Erasme - Métropole de Lyon)</li>
          <li>Johan Dufour (L'Arrière Guichet)</li>
          <li>Marion Letorey (ANCT)</li>
        </ul>
        <GithubLink bgColor={bgColorRef.current?.style.backgroundColor} />
      </AboutWrapper>
      <LoginFormWrapper>
        <LoginForm />
      </LoginFormWrapper>
    </Layout>
  );
};
