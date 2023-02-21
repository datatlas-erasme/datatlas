import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { selectCurrentUserId } from '../../store/selectors';
import Navbar from '../../components/nav/Navbar';
import Footer from '../../components/footer/footer';
import { theme } from '../../style/theme';

const LayoutStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
export const AppLayout = () => {
  const currentUserId = useSelector(selectCurrentUserId);
  if (!currentUserId) {
    return <Navigate to="/login" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <LayoutStyle>
        <Navbar />
        <Outlet />
        <Footer />
      </LayoutStyle>
    </ThemeProvider>
  );
};
