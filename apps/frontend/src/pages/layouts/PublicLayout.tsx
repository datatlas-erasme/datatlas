import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import Footer from '../../components/footer/Footer';

export type LayoutProps = PropsWithChildren<object>;

const PublicLayoutWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  min-height: 100vh;
  width: 100vw;
`;

export const PublicLayout = ({ children }: LayoutProps) => {
  return (
    <PublicLayoutWrapper>
      {children}
      <Footer />
    </PublicLayoutWrapper>
  );
};
