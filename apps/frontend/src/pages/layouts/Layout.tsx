import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { selectCurrentUserId } from '../../store/selectors';
import Footer from '../../components/footer/footer';
import { theme } from '../../style/theme';

export type LayoutProps = PropsWithChildren<object>;

const LayoutWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  //justify-content: flex-start;
  //min-height: 100vh;
  width: 100vw;
`;

export const Layout = ({ children }: LayoutProps) => {
  const currentUserId = useSelector(selectCurrentUserId);
  if (currentUserId) {
    return <Navigate to="/" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <LayoutWrapper>
        {children}
        <Footer />
      </LayoutWrapper>
    </ThemeProvider>
  );
};
