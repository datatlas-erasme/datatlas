import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectCurrentUserId } from '../../store/selectors';
import Navbar from '../../components/nav/Navbar';
import Footer from '../../components/footer/Footer';

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
    <LayoutStyle>
      <Navbar />
      <Outlet />
      <Footer />
    </LayoutStyle>
  );
};
