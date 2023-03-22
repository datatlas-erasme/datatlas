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

export const GithubLink = ({ bgColor }: GithubLinkInterface) => {
  return (
    <GithubLinkContainer style={{ backgroundColor: bgColor }}>
      <a href={'https://github.com/datatlas-erasme/datatlas'} target={'_blank'} rel={'noreferrer'} title={'Github'}>
        <GithubLogo style={{ color: '#FFFFFF' }} />
      </a>
    </GithubLinkContainer>
  );
};
