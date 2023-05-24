import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../../components/nav/Navbar';
import Footer from '../../components/footer/Footer';

const LayoutStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
export const AppLayout = () => {
  return (
    <LayoutStyle>
      <Navbar />
      <Outlet />
      <Footer />
    </LayoutStyle>
  );
};
