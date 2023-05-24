import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import Footer from '../../components/footer/Footer';

export type LayoutProps = PropsWithChildren<object>;

const PublicLayoutWrapper = styled.div`
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

export const PublicLayout = ({ children }: LayoutProps) => {
  return (
    <PublicLayoutWrapper>
      <Content>{children}</Content>
      <Footer />
    </PublicLayoutWrapper>
  );
};
