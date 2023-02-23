import React from 'react';
import styled from 'styled-components';
import { GithubLogo } from '../logos';

interface GithubLinkInterface {
  // Waiting for a solution's display wich conditional color
  bgColor?: string;
}

const GithubLinkContainer = styled.div`
  display: flex;
  align-items: center;
  p {
    padding-right: 20px;
    margin: 0;
  }
`;

const GithubLink = ({ bgColor }: GithubLinkInterface) => {
  return (
    <GithubLinkContainer style={{ backgroundColor: bgColor }}>
      <p>Lien vers le Github du projet :</p>
      <a href={'/'} target={'_blank'} rel={'noreferrer'}>
        <GithubLogo style={{ color: '#FFFFFF' }} />
      </a>
    </GithubLinkContainer>
  );
};

export default GithubLink;
