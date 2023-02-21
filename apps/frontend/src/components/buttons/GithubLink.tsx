import React from 'react';
import styled from 'styled-components';
import { GithubLogo } from '../logos';
import { rgb2hex } from '../../utils/rgb2hex';

interface GithubLinkInterface {
  bgColor: any;
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
  console.log(bgColor);
  return (
    <GithubLinkContainer>
      <p>Lien vers le Github du projet :</p>
      <a href={'/'} target={'_blank'} rel={'noreferrer'}>
        <GithubLogo style={{ color: '#FFFFFF' }} />
      </a>
    </GithubLinkContainer>
  );
};

export default GithubLink;
