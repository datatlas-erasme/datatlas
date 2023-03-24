import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
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
  ul,
  h2,
  h3 {
    color: ${({ theme }) => theme.panelBackgroundLT};
    margin: 10px 0;
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
          Vous souhaitez rejoindre l'expérimentation et tester l'outil ?{' '}
          <a href={'mailto:administrateur@metropole.fr'}>Contacter l'administrateur</a>
        </p>
      </LogoWrapper>
      <AboutWrapper displayAbout={displayAbout} ref={bgColorRef}>
        <SidePanelButton onClick={handleDisplayAbout} displayAbout={displayAbout}>
          <StyledLabel htmlFor={'About'}>
            <FormattedMessage defaultMessage="À propos" />
          </StyledLabel>
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
        <GithubLink bgColor={bgColorRef.current?.style.backgroundColor} />
      </AboutWrapper>
      <LoginFormWrapper>
        <LoginForm />
      </LoginFormWrapper>
    </Layout>
  );
};
