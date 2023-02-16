import React from 'react';
import styled from 'styled-components';
import { GithubLogo } from '../logos';

const GithubLinkContainer = styled.div`
  display: flex;
  align-items: center;
  p {
    padding-right: 20px;
    margin: 0;
  }
`;

const GithubLink = () => {
  return (
    <GithubLinkContainer>
      <p>Lien vers le Github du projet :</p>
      <a href={'/'} target={'_blank'} rel={'noreferrer'}>
        <GithubLogo />
      </a>
    </GithubLinkContainer>
  );
};

export default GithubLink;
