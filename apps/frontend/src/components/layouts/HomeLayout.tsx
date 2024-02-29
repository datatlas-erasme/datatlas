import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Footer } from '../../components/footer/Footer';

export type LayoutProps = PropsWithChildren<object>;

const HomeLayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
`;

export const HomeLayout = ({ children }: LayoutProps) => {
  return (
    <HomeLayoutWrapper>
      <Content>{children}</Content>
      <Footer />
    </HomeLayoutWrapper>
  );
};
