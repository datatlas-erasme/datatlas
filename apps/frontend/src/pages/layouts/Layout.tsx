import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import Footer from '../../components/footer/Footer';

export type LayoutProps = PropsWithChildren<object>;

const LayoutWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  min-height: 100vh;
  width: 100vw;
`;

export const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutWrapper>
      {children}
      <Footer />
    </LayoutWrapper>
  );
};
